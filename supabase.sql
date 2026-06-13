create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  secret_identity text not null,
  player_guess text,
  match_rate int,
  memory_recovery int,
  rank text,
  is_success boolean,
  good_words jsonb,
  good_questions jsonb,
  unnecessary_questions jsonb,
  advice text,
  after_story text,
  chat_history jsonb
);
