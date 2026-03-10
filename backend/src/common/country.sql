-- SQLite
select * from country;

delete from country;

insert into country (name, code) values ('Bangladesh', 'BD');

update country set currency='BDT',flag='https://www.geonames.org/flags/x/bd.gif',capital='Dhaka',symbol='\u09F3' where id = 1;

-- "flag": "https://www.geonames.org/flags/x/bd.gif",
--     "symbol": "\u09F3",


delete from financial_account;
delete from transactions;

select * from transactions;