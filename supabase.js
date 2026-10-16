/**
 * VERIFAI — Supabase Client Integration Layer
 * 
 * Manages remote data synchronization, authentication, and audit logging
 * with full fallback to localStorage when offline or not configured.
 */

(function () {
  'use strict';

  let client = null;
  let isSupabaseOnline = false;

  // Initialize client if config & library are present
  function initSupabase() {
    try {
      const cfg = window.VERIFAI_CONFIG || {};
      const url = cfg.SUPABASE_URL || '';
      const key = cfg.SUPABASE_ANON_KEY || '';

      if (url && key && !url.includes('your-project-ref') && !key.includes('your-anon-public-key') && window.supabase) {
        client = window.supabase.createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });
        return true;
      }
    } catch (err) {
      console.warn('[VERIFAI Supabase] Initialization error:', err);
    }
    return false;
  }

  // Model Mapper: Supabase snake_case to VERIFAI camelCase
  function rowToRecord(row) {
    if (!row) return null;
    return {
      id: row.id,
      type: row.type,
      recipientName: row.recipient_name || '',
      issuerName: row.issuer_name || '',
      issuerDomain: row.issuer_domain || '',
      designation: row.designation || '',
      description: row.description || '',
      issueDate: row.issue_date || '',
      expiryDate: row.expiry_date || '',
      signatoryName: row.signatory_name || '',
      signatoryTitle: row.signatory_title || '',
      specificDetails: row.specific_details || {},
      sha256: row.sha256 || '',
      status: row.status || 'verified',
      revocationReason: row.revocation_reason || '',
      revocationDate: row.revocation_date || '',
      verificationScope: row.verification_scope || '',
      isDemo: Boolean(row.is_demo),
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString()
    };
  }

  // Model Mapper: VERIFAI camelCase to Supabase snake_case
  function recordToRow(rec) {
    if (!rec) return null;
    const row = {
      id: rec.id,
      type: rec.type,
      recipient_name: rec.recipientName || '',
      issuer_name: rec.issuerName || '',
      issuer_domain: rec.issuerDomain || '',
      designation: rec.designation || '',
      description: rec.description || '',
      issue_date: rec.issueDate || '',
      expiry_date: rec.expiryDate || '',
      signatory_name: rec.signatoryName || '',
      signatory_title: rec.signatoryTitle || '',
      specific_details: rec.specificDetails || {},
      sha256: rec.sha256 || '',
      status: rec.status || 'verified',
      revocation_reason: rec.revocationReason || '',
      revocation_date: rec.revocationDate || '',
      verification_scope: rec.verificationScope || '',
      is_demo: Boolean(rec.isDemo)
    };
    if (rec.createdAt) row.created_at = rec.createdAt;
    return row;
  }

  // Public Supabase Service API
  window.VerifaiSupabase = {
    isConfigured: function () {
      const cfg = window.VERIFAI_CONFIG || {};
      return Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('your-project-ref'));
    },

    getClient: function () {
      if (!client) {
        initSupabase();
      }
      return client;
    },

    // Check connectivity and verify table existence
    checkConnection: async function () {
      const sb = this.getClient();
      if (!sb) return { connected: false, error: 'Supabase client not initialized' };

      try {
        const { data, error } = await sb.from('credentials').select('id').limit(1);
        if (error) {
          isSupabaseOnline = false;
          return { connected: false, error: error.message };
        }
        isSupabaseOnline = true;
        return { connected: true, data };
      } catch (err) {
        isSupabaseOnline = false;
        return { connected: false, error: err.message };
      }
    },

    // Fetch all credentials from Supabase
    fetchCredentials: async function () {
      const sb = this.getClient();
      if (!sb) return null;

      try {
        const { data, error } = await sb
          .from('credentials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('[VERIFAI Supabase] Error fetching credentials:', error.message);
          return null;
        }
        return (data || []).map(rowToRecord);
      } catch (err) {
        console.warn('[VERIFAI Supabase] Fetch exception:', err);
        return null;
      }
    },

    // Find credential by ID
    getCredentialById: async function (id) {
      const sb = this.getClient();
      if (!sb) return null;

      try {
        const { data, error } = await sb
          .from('credentials')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error || !data) return null;
        return rowToRecord(data);
      } catch (err) {
        console.warn('[VERIFAI Supabase] getCredentialById exception:', err);
        return null;
      }
    },

    // Find credential by Canonical SHA-256 Hash
    getCredentialByHash: async function (hash) {
      const sb = this.getClient();
      if (!sb || !hash) return null;

      try {
        const { data, error } = await sb
          .from('credentials')
          .select('*')
          .eq('sha256', hash.trim().toUpperCase())
          .maybeSingle();

        if (error || !data) return null;
        return rowToRecord(data);
      } catch (err) {
        console.warn('[VERIFAI Supabase] getCredentialByHash exception:', err);
        return null;
      }
    },

    // Save or upsert a credential
    saveCredential: async function (record) {
      const sb = this.getClient();
      if (!sb) return { success: false, error: 'Client not ready' };

      try {
        const row = recordToRow(record);
        const { data, error } = await sb
          .from('credentials')
          .upsert(row)
          .select()
          .maybeSingle();

        if (error) {
          return { success: false, error: error.message };
        }
        await this.logAudit('SAVE_CREDENTIAL', record.id, `Saved credential ${record.id} (${record.type})`);
        return { success: true, record: rowToRecord(data) };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Update credential fields
    updateCredential: async function (id, updates) {
      const sb = this.getClient();
      if (!sb) return { success: false, error: 'Client not ready' };

      try {
        const row = {};
        if (updates.status !== undefined) row.status = updates.status;
        if (updates.revocationReason !== undefined) row.revocation_reason = updates.revocationReason;
        if (updates.revocationDate !== undefined) row.revocation_date = updates.revocationDate;
        if (updates.recipientName !== undefined) row.recipient_name = updates.recipientName;
        if (updates.issuerName !== undefined) row.issuer_name = updates.issuerName;
        if (updates.issuerDomain !== undefined) row.issuer_domain = updates.issuerDomain;
        if (updates.designation !== undefined) row.designation = updates.designation;
        if (updates.description !== undefined) row.description = updates.description;
        if (updates.issueDate !== undefined) row.issue_date = updates.issueDate;
        if (updates.expiryDate !== undefined) row.expiry_date = updates.expiryDate;
        if (updates.signatoryName !== undefined) row.signatory_name = updates.signatoryName;
        if (updates.signatoryTitle !== undefined) row.signatory_title = updates.signatoryTitle;
        if (updates.specificDetails !== undefined) row.specific_details = updates.specificDetails;
        if (updates.sha256 !== undefined) row.sha256 = updates.sha256;
        if (updates.verificationScope !== undefined) row.verification_scope = updates.verificationScope;

        const { data, error } = await sb
          .from('credentials')
          .update(row)
          .eq('id', id)
          .select()
          .maybeSingle();

        if (error) return { success: false, error: error.message };
        await this.logAudit('UPDATE_CREDENTIAL', id, `Updated credential ${id}`);
        return { success: true, record: rowToRecord(data) };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Delete a credential
    deleteCredential: async function (id) {
      const sb = this.getClient();
      if (!sb) return { success: false, error: 'Client not ready' };

      try {
        const { error } = await sb
          .from('credentials')
          .delete()
          .eq('id', id);

        if (error) return { success: false, error: error.message };
        await this.logAudit('DELETE_CREDENTIAL', id, `Deleted credential ${id}`);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    // Append to audit log
    logAudit: async function (action, recordId, details) {
      const sb = this.getClient();
      if (!sb) return;

      try {
        await sb.from('audit_log').insert({
          action,
          record_id: recordId,
          details
        });
      } catch (err) {
        console.warn('[VERIFAI Supabase] Audit log notice:', err.message);
      }
    },

    // Authentication helpers
    auth: {
      signUp: async function (email, password) {
        const sb = window.VerifaiSupabase.getClient();
        if (!sb) return { error: { message: 'Supabase not initialized' } };
        return await sb.auth.signUp({ email, password });
      },
      signIn: async function (email, password) {
        const sb = window.VerifaiSupabase.getClient();
        if (!sb) return { error: { message: 'Supabase not initialized' } };
        return await sb.auth.signInWithPassword({ email, password });
      },
      signOut: async function () {
        const sb = window.VerifaiSupabase.getClient();
        if (!sb) return;
        return await sb.auth.signOut();
      },
      getUser: async function () {
        const sb = window.VerifaiSupabase.getClient();
        if (!sb) return null;
        const { data } = await sb.auth.getUser();
        return data?.user || null;
      },
      onAuthStateChange: function (callback) {
        const sb = window.VerifaiSupabase.getClient();
        if (!sb) return { data: { subscription: { unsubscribe: () => {} } } };
        return sb.auth.onAuthStateChange(callback);
      }
    }
  };

  // Attempt initial setup when script loads
  initSupabase();
})();
