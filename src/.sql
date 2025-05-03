create database if NOT EXISTS vazifa_18;

USE vazifa_18;

CREATE TABLE students (
    id int auto_increment primary key,
    name varchar(30) not null,
    age int check (age>14 and age< 120) not null,
    email varchar(40) unique not null
);

INSERT INTO students (name, age, email) VALUES 
('Ali Valiyev', 16, 'ali.valiyev@example.com'),
('Sanjar Karimov', 17, 'sanjar.karimov@example.com'),
('Kamola Rasulova', 20, 'kamola.rasulova@example.com'),
('Jahongir Bekmurodov', 22, 'jahongir.bekmurodov@example.com'),
('Dilshod Xudoyberdiyev', 18, 'dilshod.xudoyberdiyev@example.com'),
('Malika Usmonova', 19, 'malika.usmonova@example.com'),
('Zafar Rahmatov', 21, 'zafar.rahmatov@example.com'),
('Lola Toirova', 25, 'lola.toirova@example.com'),
('Diyor Ergashev', 23, 'diyor.ergashev@example.com'),
('Shahzoda Karimova', 24, 'shahzoda.karimova@example.com'),
('Baxtiyor Abdullayev', 26, 'baxtiyor.abdullayev@example.com'),
('Anora Tursunova', 18, 'anora.tursunova@example.com'),
('Sherzod Alimov', 27, 'sherzod.alimov@example.com'),
('Nigora Khasanova', 30, 'nigora.khasanova@example.com'),
('Jasur Sobirov', 28, 'jasur.sobirov@example.com'),
('Nodira Murodova', 19, 'nodira.murodova@example.com'),
('Ulugbek Islomov', 32, 'ulugbek.islomov@example.com'),
('Madina Raxmatova', 24, 'madina.raxmatova@example.com'),
('Umid Kamilov', 23, 'umid.kamilov@example.com'),
('Aziza Davronova', 20, 'aziza.davronova@example.com'),
('Sherali Normurodov', 31, 'sherali.normurodov@example.com'),
('Rayhon Masharipova', 22, 'rayhon.masharipova@example.com'),
('Erkin Shamsiyev', 29, 'erkin.shamsiyev@example.com'),
('Gulbahor Tadjibaeva', 35, 'gulbahor.tadjibaeva@example.com'),
('Rustam Nasriddinov', 28, 'rustam.nasriddinov@example.com');

DELIMITER $$

-- bu procedure studentni idsi bo'yicha olyotganda borligini tekshiradi, bo'lsa qaytardi, bo'lmasa xato qaytarasi
CREATE PROCEDURE get_student_by_id(IN studentId INT)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM students WHERE id = studentId) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Id not found';
    ELSE
        SELECT * FROM students WHERE id = studentId;
    END IF;
END $$

-- bu trigger student tablega post qilinyotganda ma'lumotlarni null ga tekshiradi
CREATE trigger insert_into_students
before insert on students
for each row
BEGIN
    IF new.name is null THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Name not given';
    end if;
    if new.age is null THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Age not given';
    end if;
    if new.email is null THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email not given';
    end if;
END $$

-- bu procedure student tabledan o'chiryotganda shu id bor bo'lsa o'chiradi, bo'lmasa xato qaytaradi:
CREATE PROCEDURE delete_student_by_id(IN studentId INT)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM students WHERE id = studentId) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Id not found';
    ELSE
        DELETE FROM students WHERE id = studentId;
    END IF;
END $$

-- bu procedure student ma'lumotlarini update qilishdan oldin shu id bor-yo'qligini tekshiradi, bo'lsa update qiladi:
CREATE PROCEDURE update_student_by_id(IN studentId INT, IN studentName VARCHAR(50), 
IN studentAge INT, IN studentEmail VARCHAR(50))

BEGIN
    IF NOT EXISTS (SELECT 1 FROM students WHERE id = studentId) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Id not found';
    ELSE
        UPDATE students set name = studentName, age = studentAge, email = studentEmail WHERE id = studentId;
    END IF;
END $$


DELIMITER ;