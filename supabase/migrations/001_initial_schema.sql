-- ============================================================================
-- VERIFAI × Supabase — Initial Database Schema Migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================================

-- ============================================================================
-- 1. CREDENTIALS TABLE
-- Stores all credential records (certificates, internship letters, job offers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS credentials (
  id                  TEXT PRIMARY KEY,
  type                TEXT NOT NULL CHECK (type IN ('CERT', 'INT', 'OFF')),
  recipient_name      TEXT NOT NULL,
  issuer_name         TEXT NOT NULL,
  issuer_domain       TEXT DEFAULT '',
  designation         TEXT DEFAULT '',
  description         TEXT DEFAULT '',
  issue_date          TEXT DEFAULT '',
  expiry_date         TEXT DEFAULT '',
  signatory_name      TEXT DEFAULT '',
  signatory_title     TEXT DEFAULT '',
  specific_details    JSONB DEFAULT '{}'::jsonb,
  sha256              TEXT DEFAULT '',
  status              TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'revoked')),
  revocation_reason   TEXT DEFAULT '',
  revocation_date     TEXT DEFAULT '',
  verification_scope  TEXT DEFAULT '',
  is_demo             BOOLEAN DEFAULT false,
  created_by          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by status and type
CREATE INDEX IF NOT EXISTS idx_credentials_status ON credentials(status);
CREATE INDEX IF NOT EXISTS idx_credentials_type ON credentials(type);
CREATE INDEX IF NOT EXISTS idx_credentials_created_by ON credentials(created_by);

-- ============================================================================
-- 2. AUDIT LOG TABLE
-- Immutable append-only audit trail for all credential operations
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id            BIGSERIAL PRIMARY KEY,
  action        TEXT NOT NULL,
  record_id     TEXT NOT NULL,
  details       TEXT DEFAULT '',
  performed_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_record_id ON audit_log(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);

-- ============================================================================
-- 3. UPDATED_AT AUTO-TRIGGER
-- Automatically update the updated_at timestamp on credential modifications
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_credentials_updated_at
  BEFORE UPDATE ON credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on both tables
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- CREDENTIALS POLICIES
-- ---------------------------------------------------------------------------

-- Anyone (including anonymous visitors) can READ credentials for verification
CREATE POLICY "Public read access for credential verification"
  ON credentials
  FOR SELECT
  USING (true);

-- Only authenticated users (issuers) can INSERT new credentials
CREATE POLICY "Authenticated users can create credentials"
  ON credentials
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only the creator can UPDATE their own credentials
CREATE POLICY "Creators can update their own credentials"
  ON credentials
  FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Only the creator can DELETE their own credentials
CREATE POLICY "Creators can delete their own credentials"
  ON credentials
  FOR DELETE
  USING (auth.uid() = created_by);

-- ---------------------------------------------------------------------------
-- AUDIT LOG POLICIES
-- ---------------------------------------------------------------------------

-- Anyone can READ audit logs for transparency
CREATE POLICY "Public read access for audit log"
  ON audit_log
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT audit entries
CREATE POLICY "Authenticated users can create audit entries"
  ON audit_log
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Audit log entries are immutable — no UPDATE or DELETE policies

-- ============================================================================
-- 5. SEED DATA — Default Demonstration Records
-- These match the DEFAULT_REGISTRY in script.js
-- ============================================================================
INSERT INTO credentials (id, type, recipient_name, issuer_name, issuer_domain, designation, description, issue_date, expiry_date, signatory_name, signatory_title, specific_details, sha256, status, revocation_reason, revocation_date, verification_scope, is_demo, created_at, updated_at)
VALUES
  (
    'VF-CERT-2024-9102', 'CERT', 'Rahul Sharma', 'Google Cloud & AI Academy', 'cloud.google.com',
    'Professional Cloud Architect & Generative AI Specialization',
    'Successfully completed 120 hours of advanced curriculum covering scalable cloud infrastructure, machine learning pipelines, and multi-cloud resilience.',
    '2024-05-18', 'Lifetime', 'Dr. Sundar V.', 'Head of Cloud Education & Developer Relations',
    '{"courseName":"Cloud Architect & Generative AI Specialization","grade":"Grade A+ (96.4%)","completionDate":"2024-05-15"}'::jsonb,
    'E8A21B9038C4F1A73E45229B07D3E83C5A96781423FB216A429074F96328A1CD',
    'verified', '', '',
    'Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.',
    true, '2024-05-18T10:00:00.000Z', '2024-05-18T10:00:00.000Z'
  ),
  (
    'VF-INT-2024-4481', 'INT', 'Sneha Patel', 'Tata Consultancy Services (TCS)', 'tcs.com',
    'Software Engineering Intern — Enterprise Cloud Practice',
    'Completed a 6-month intensive internship program contributing to distributed microservices architecture, automated testing pipelines, and cloud migration.',
    '2024-06-30', 'Lifetime', 'Rajesh Gopinathan', 'VP & Global Head of Early Talent',
    '{"role":"Software Engineering Intern","department":"Cloud Engineering Practice","startDate":"2024-01-08","endDate":"2024-06-28","performanceRating":"Outstanding (5/5)"}'::jsonb,
    '72B84D01C95EFA823A4017C2901DF53826EAA5B12809C348126F76D04791E5B3',
    'verified', '', '',
    'Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.',
    true, '2024-06-30T14:30:00.000Z', '2024-06-30T14:30:00.000Z'
  ),
  (
    'VF-OFF-2024-8833', 'OFF', 'Ananya Deshmukh', 'Microsoft India R&D Pvt. Ltd.', 'microsoft.com',
    'Software Engineer II — Azure Platform & Systems',
    'Official full-time offer of employment covering responsibilities, compensation structure, health benefits, equity grants, and code of business conduct.',
    '2024-07-15', '2024-08-15', 'Satya N.', 'Director of Talent Acquisition — Asia Pacific',
    '{"jobTitle":"Software Engineer II","department":"Azure Core Platform","location":"Bangalore, India (Hybrid)","ctc":"₹24,50,000 / annum + Stock Units","joiningDate":"2024-09-02","offerExpiry":"2024-08-15"}'::jsonb,
    '9F1823C47B01A940E812C573A03B521946271DF826019A84236B581C92408E77',
    'verified', '', '',
    'Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.',
    true, '2024-07-15T09:15:00.000Z', '2024-07-15T09:15:00.000Z'
  ),
  (
    'VF-FRAUD-2024-0004', 'OFF', 'Vikram Malhotra', 'Google Cloud (Impersonated)', 'google-recruiters-support.telegram.me',
    'Senior Cloud Associate & Remote Data Operator',
    'Simulated recruitment scam: An impersonated hiring offer requesting an upfront ''Laptop Security Deposit'' and ₹12,500 ''Stipend Clearance Bond'' via UPI.',
    '2024-04-10', '2024-04-11', 'Fake HR Recruiter', 'Alleged Talent Coordinator (Telegram account: @google_recruiter_fast)',
    '{"jobTitle":"Remote Cloud Operator","department":"Unverified Operations","location":"Remote / Telegram Only","ctc":"₹38,00,000 / annum (Implausibly High)","joiningDate":"Immediate","offerExpiry":"24 Hours Mandatory"}'::jsonb,
    '33D4192A082C5F4298B0721E0176D3A95E421948B01F29C354A180E291487DC4',
    'revoked',
    'FLAGGED FRAUD: Impersonation of Google recruitment team. Recruiter demanded ₹12,500 security deposit via Telegram UPI handle. Genuine companies never charge candidates.',
    '2024-04-12',
    'RECORD REVOKED IN VERIFAI DEMO REGISTRY DUE TO IDENTIFIED FRAUD INDICATORS.',
    true, '2024-04-10T08:00:00.000Z', '2024-04-12T11:20:00.000Z'
  )
ON CONFLICT (id) DO NOTHING;

-- Seed initial audit entry
INSERT INTO audit_log (action, record_id, details)
VALUES ('INIT', 'SYSTEM', 'Initialized default demonstration registry with 4 sample records.')
ON CONFLICT DO NOTHING;
