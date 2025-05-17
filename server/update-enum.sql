-- Add the new enum value if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'pending_deletion' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'leave_request_status_enum')) THEN
        ALTER TYPE leave_request_status_enum ADD VALUE 'pending_deletion';
    END IF;
END
$$;