
'''
Create User
'''

CREATE USER browny WITH ENCRYPTED PASSWORD 'wZ8FWmtbLaeqefw5UZw3JrNdUDVNAbyt';

'''
Create Database
'''

CREATE DATABASE browny
  LC_COLLATE 'C'
  LC_CTYPE 'C'
  ENCODING 'UTF8'
  TEMPLATE template0
  with owner browny
  ;


'''
Postgres Version 11.10
'''


'''
Postgres Setting
https://postgresql.kr/docs/11/runtime-config-client.html
'''

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
-- uuid-ossp 모듈은 여러 표준 알고리즘 중 하나를 사용하여 범용 고유 식별자 (UUID를)를 생성하는 기능을 제공한다
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.auth_tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fk_user_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE public.auth_tokens OWNER TO browny;


--
-- Name: auth_email; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.auth_email (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(255),
    email character varying(255),
    is_success boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.auth_email OWNER TO browny;


--
-- Name: users; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255),
    email character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_certified boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO browny;



-- Name: social_accounts; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.social_accounts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    social_id character varying(255),
    access_token character varying(255),
    provider character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    fk_user_id uuid NOT NULL
);


ALTER TABLE public.social_accounts OWNER TO browny;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.user_profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    description character varying(255),
    thumbnail character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    fk_user_id uuid NOT NULL,
    profile_links jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO browny;


--
-- Name: user_follows; Type: TABLE; Schema: public; Owner: browny
--

CREATE TABLE public.user_follows (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fk_user_id uuid NOT NULL,
    fk_follow_user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_follows OWNER TO browny;




--
-- Name: auth_email auth_email_code_key; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.auth_email
    ADD CONSTRAINT auth_email_code_key UNIQUE (code);


--
-- Name: auth_email auth_email_pkey; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.email_auth
    ADD CONSTRAINT email_auth_pkey PRIMARY KEY (id);



--
-- Name: auth_tokens PK_41e9ddfbb32da18c4e85e45c2fd; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT "PK_41e9ddfbb32da18c4e85e45c2fd" PRIMARY KEY (id);



--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);



--
-- Name: social_accounts social_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.social_accounts
    ADD CONSTRAINT social_accounts_pkey PRIMARY KEY (id);



--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_follows user_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: browny
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_pkey PRIMARY KEY (id);

