create table if not exists public.pcc_users (
  user_id uuid primary key,
  email text not null,
  full_name text,
  tenant_slug text not null,
  tenant_name text not null,
  role text not null default 'advisor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pcc_users alter column role set default 'advisor';

create unique index if not exists pcc_users_email_idx on public.pcc_users (email);
create index if not exists pcc_users_tenant_slug_idx on public.pcc_users (tenant_slug);
create index if not exists pcc_users_tenant_role_idx on public.pcc_users (tenant_slug, role);

create table if not exists public.pcc_clients (
  id bigserial primary key,
  tenant_slug text not null,
  advisor_user_id uuid not null,
  user_id uuid,
  email text not null,
  full_name text not null,
  status text not null default 'invited',
  invite_token text,
  invited_at timestamptz,
  accepted_at timestamptz,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists pcc_clients_tenant_email_idx on public.pcc_clients (tenant_slug, email);
create unique index if not exists pcc_clients_invite_token_idx on public.pcc_clients (invite_token) where invite_token is not null;
create index if not exists pcc_clients_tenant_advisor_idx on public.pcc_clients (tenant_slug, advisor_user_id);
create index if not exists pcc_clients_user_idx on public.pcc_clients (user_id);

create table if not exists public.pcc_plaid_items (
  id bigserial primary key,
  user_id uuid not null,
  tenant_slug text not null,
  client_id bigint references public.pcc_clients(id) on delete cascade,
  plaid_item_id text not null unique,
  access_token_encrypted text not null,
  institution_id text,
  institution_name text,
  available_products jsonb not null default '[]'::jsonb,
  accounts jsonb not null default '[]'::jsonb,
  status text not null default 'active',
  health text not null default 'healthy',
  consented_at timestamptz,
  disconnected_at timestamptz,
  last_webhook_type text,
  last_webhook_code text,
  last_webhook_at timestamptz,
  last_successful_sync_at timestamptz,
  last_error_code text,
  last_error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pcc_plaid_items_user_idx on public.pcc_plaid_items (user_id);
create index if not exists pcc_plaid_items_tenant_idx on public.pcc_plaid_items (tenant_slug);
create index if not exists pcc_plaid_items_client_idx on public.pcc_plaid_items (client_id);
create index if not exists pcc_plaid_items_health_idx on public.pcc_plaid_items (tenant_slug, health);

create table if not exists public.pcc_accounts (
  id bigserial primary key,
  tenant_slug text not null,
  client_id bigint not null references public.pcc_clients(id) on delete cascade,
  plaid_item_id text,
  plaid_account_id text not null unique,
  institution_name text,
  name text not null,
  official_name text,
  mask text,
  type text,
  subtype text,
  status text not null default 'active',
  current_balance numeric(18,2),
  available_balance numeric(18,2),
  iso_currency_code text default 'USD',
  last_balance_update timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pcc_accounts_client_idx on public.pcc_accounts (client_id);
create index if not exists pcc_accounts_tenant_client_idx on public.pcc_accounts (tenant_slug, client_id);

create table if not exists public.pcc_transactions (
  id bigserial primary key,
  tenant_slug text not null,
  client_id bigint not null references public.pcc_clients(id) on delete cascade,
  plaid_item_id text,
  plaid_account_id text,
  plaid_transaction_id text not null unique,
  amount numeric(18,2) not null,
  iso_currency_code text default 'USD',
  authorized_date date,
  posted_date date not null,
  merchant_name text,
  description text,
  category jsonb not null default '[]'::jsonb,
  pending boolean not null default false,
  removed boolean not null default false,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pcc_transactions_client_idx on public.pcc_transactions (client_id, posted_date desc);
create index if not exists pcc_transactions_tenant_client_idx on public.pcc_transactions (tenant_slug, client_id, posted_date desc);

create table if not exists public.pcc_sync_cursors (
  id bigserial primary key,
  tenant_slug text not null,
  client_id bigint not null references public.pcc_clients(id) on delete cascade,
  plaid_item_id text not null unique,
  sync_cursor text,
  last_attempt_at timestamptz,
  last_success_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pcc_sync_cursors_client_idx on public.pcc_sync_cursors (client_id);

create table if not exists public.pcc_plaid_sync_runs (
  id bigserial primary key,
  tenant_slug text not null,
  client_id bigint not null references public.pcc_clients(id) on delete cascade,
  plaid_item_id text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'started',
  error_code text,
  error_message text,
  transactions_added integer not null default 0,
  transactions_modified integer not null default 0,
  transactions_removed integer not null default 0,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create index if not exists pcc_plaid_sync_runs_client_idx on public.pcc_plaid_sync_runs (client_id, started_at desc);
create index if not exists pcc_plaid_sync_runs_tenant_status_idx on public.pcc_plaid_sync_runs (tenant_slug, status, started_at desc);

create table if not exists public.pcc_audit_events (
  id bigserial primary key,
  actor_user_id uuid,
  tenant_slug text,
  action text not null,
  target_type text,
  target_id text,
  status text not null default 'success',
  ip_address text,
  user_agent text,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pcc_audit_events_tenant_idx on public.pcc_audit_events (tenant_slug, created_at desc);
create index if not exists pcc_audit_events_actor_idx on public.pcc_audit_events (actor_user_id, created_at desc);

alter table public.pcc_users enable row level security;
alter table public.pcc_clients enable row level security;
alter table public.pcc_plaid_items enable row level security;
alter table public.pcc_accounts enable row level security;
alter table public.pcc_transactions enable row level security;
alter table public.pcc_sync_cursors enable row level security;
alter table public.pcc_plaid_sync_runs enable row level security;
alter table public.pcc_audit_events enable row level security;

drop policy if exists "pcc_users_self_select" on public.pcc_users;
create policy "pcc_users_self_select"
on public.pcc_users
for select
using (auth.uid() = user_id);

drop policy if exists "pcc_users_self_update" on public.pcc_users;
create policy "pcc_users_self_update"
on public.pcc_users
for update
using (auth.uid() = user_id);

drop policy if exists "pcc_clients_role_select" on public.pcc_clients;
create policy "pcc_clients_role_select"
on public.pcc_clients
for select
using (
  (
    user_id = auth.uid()
  ) or exists (
    select 1
    from public.pcc_users u
    where u.user_id = auth.uid()
      and u.tenant_slug = pcc_clients.tenant_slug
      and (
        u.role in ('owner', 'admin')
        or (u.role = 'advisor' and pcc_clients.advisor_user_id = auth.uid())
      )
  )
);

drop policy if exists "pcc_clients_role_update" on public.pcc_clients;
create policy "pcc_clients_role_update"
on public.pcc_clients
for update
using (
  exists (
    select 1
    from public.pcc_users u
    where u.user_id = auth.uid()
      and u.tenant_slug = pcc_clients.tenant_slug
      and (
        u.role in ('owner', 'admin')
        or (u.role = 'advisor' and pcc_clients.advisor_user_id = auth.uid())
      )
  )
);

drop policy if exists "pcc_plaid_items_role_select" on public.pcc_plaid_items;
create policy "pcc_plaid_items_role_select"
on public.pcc_plaid_items
for select
using (
  exists (
    select 1
    from public.pcc_clients c
    left join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_plaid_items.client_id
      and c.tenant_slug = pcc_plaid_items.tenant_slug
      and (
        c.user_id = auth.uid()
        or (u.user_id = auth.uid() and u.role in ('owner', 'admin') and u.tenant_slug = c.tenant_slug)
        or (u.user_id = auth.uid() and u.role = 'advisor' and c.advisor_user_id = auth.uid() and u.tenant_slug = c.tenant_slug)
      )
  )
);

drop policy if exists "pcc_plaid_items_role_update" on public.pcc_plaid_items;
create policy "pcc_plaid_items_role_update"
on public.pcc_plaid_items
for update
using (
  exists (
    select 1
    from public.pcc_clients c
    join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_plaid_items.client_id
      and c.tenant_slug = pcc_plaid_items.tenant_slug
      and u.tenant_slug = c.tenant_slug
      and (
        u.role in ('owner', 'admin')
        or (u.role = 'advisor' and c.advisor_user_id = auth.uid())
      )
  )
);

drop policy if exists "pcc_accounts_role_select" on public.pcc_accounts;
create policy "pcc_accounts_role_select"
on public.pcc_accounts
for select
using (
  exists (
    select 1
    from public.pcc_clients c
    left join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_accounts.client_id
      and c.tenant_slug = pcc_accounts.tenant_slug
      and (
        c.user_id = auth.uid()
        or (u.user_id = auth.uid() and u.role in ('owner', 'admin') and u.tenant_slug = c.tenant_slug)
        or (u.user_id = auth.uid() and u.role = 'advisor' and c.advisor_user_id = auth.uid() and u.tenant_slug = c.tenant_slug)
      )
  )
);

drop policy if exists "pcc_transactions_role_select" on public.pcc_transactions;
create policy "pcc_transactions_role_select"
on public.pcc_transactions
for select
using (
  exists (
    select 1
    from public.pcc_clients c
    left join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_transactions.client_id
      and c.tenant_slug = pcc_transactions.tenant_slug
      and (
        c.user_id = auth.uid()
        or (u.user_id = auth.uid() and u.role in ('owner', 'admin') and u.tenant_slug = c.tenant_slug)
        or (u.user_id = auth.uid() and u.role = 'advisor' and c.advisor_user_id = auth.uid() and u.tenant_slug = c.tenant_slug)
      )
  )
);

drop policy if exists "pcc_sync_cursors_role_select" on public.pcc_sync_cursors;
create policy "pcc_sync_cursors_role_select"
on public.pcc_sync_cursors
for select
using (
  exists (
    select 1
    from public.pcc_clients c
    join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_sync_cursors.client_id
      and c.tenant_slug = pcc_sync_cursors.tenant_slug
      and u.tenant_slug = c.tenant_slug
      and (
        u.role in ('owner', 'admin')
        or (u.role = 'advisor' and c.advisor_user_id = auth.uid())
      )
  )
);

drop policy if exists "pcc_plaid_sync_runs_role_select" on public.pcc_plaid_sync_runs;
create policy "pcc_plaid_sync_runs_role_select"
on public.pcc_plaid_sync_runs
for select
using (
  exists (
    select 1
    from public.pcc_clients c
    join public.pcc_users u
      on u.user_id = auth.uid()
    where c.id = pcc_plaid_sync_runs.client_id
      and c.tenant_slug = pcc_plaid_sync_runs.tenant_slug
      and u.tenant_slug = c.tenant_slug
      and (
        u.role in ('owner', 'admin')
        or (u.role = 'advisor' and c.advisor_user_id = auth.uid())
      )
  )
);

drop policy if exists "pcc_audit_events_tenant_owner_select" on public.pcc_audit_events;
create policy "pcc_audit_events_tenant_owner_select"
on public.pcc_audit_events
for select
using (
  exists (
    select 1
    from public.pcc_users u
    where u.user_id = auth.uid()
      and u.tenant_slug = pcc_audit_events.tenant_slug
      and u.role in ('owner', 'admin')
  )
);
