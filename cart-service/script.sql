create extension if not exists "uuid-ossp";

create table if not exists carts (
    id uuid not null default uuid_generate_v4() primary key,
    user_id uuid not null,
    created_at date not null,
    updated_at date not null,
    status text
);

create table if not exists cart_items (
	id uuid not null default uuid_generate_v4() primary key,
    cart_id uuid references carts(id),
    product_id uuid,
    count smallint
);

create table if not exists orders (
	id uuid not null default uuid_generate_v4() primary key,
    user_id uuid,
    cart_id uuid references carts(id),
    payment json,
    delivery json,
    comments text,
	status text,
	total integer
);


insert into carts (user_id, created_at, updated_at, status) values ('55873324-ef2e-11ed-a05b-0242ac120003', '2023-05-10', '2023-05-10', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('1157f926-ef2f-11ed-a05b-0242ac120003', '2023-05-10', '2023-05-10', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('180e8faa-ef2f-11ed-a05b-0242ac120003', '2023-05-10', '2023-05-10', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('1ffcbdae-ef2f-11ed-a05b-0242ac120003', '2023-05-10', '2023-05-10', 'ORDERED');


insert into cart_items (cart_id, product_id, count) values ('f95822c6-19cd-4d1a-9181-933177dbee3b', '2f0d54d8-35c6-4737-9c7d-2da7daf208cb', 1);
insert into cart_items (cart_id, product_id, count) values ('f95822c6-19cd-4d1a-9181-933177dbee3b', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 2);
insert into cart_items (cart_id, product_id, count) values ('f95822c6-19cd-4d1a-9181-933177dbee3b', '7567ec4b-b10c-48c5-9445-fc73c48a80a2', 3);

alter table cart_items add column product_price integer;
alter table cart_items alter column product_price set data type numeric;

update cart_items set product_price = 14 where cart_id = 'f95822c6-19cd-4d1a-9181-933177dbee3b' and product_id = '2f0d54d8-35c6-4737-9c7d-2da7daf208cb';
update cart_items set product_price = 2.4 where cart_id = 'f95822c6-19cd-4d1a-9181-933177dbee3b' and product_id = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
update cart_items set product_price = 23 where cart_id = 'f95822c6-19cd-4d1a-9181-933177dbee3b' and product_id = '7567ec4b-b10c-48c5-9445-fc73c48a80a2';

alter table orders alter column total set data type numeric;