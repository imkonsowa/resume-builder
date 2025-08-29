-- Create share tokens table for public resume sharing
CREATE TABLE IF NOT EXISTS share_tokens (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    resume_id TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL DEFAULT (lower(hex(randomblob(32)))),
    expires_at DATETIME,
    view_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_share_tokens_token ON share_tokens(token);
CREATE INDEX idx_share_tokens_resume_id ON share_tokens(resume_id);