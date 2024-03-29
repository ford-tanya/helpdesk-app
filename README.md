# Helpdesk support ticket management application
โปรแกรมที่ช่วยจัดการคำร้องขอความช่วยเหลือ

Demo App URL: [Helpdesk (helpdesk-app-five.vercel.app)](https://helpdesk-app-five.vercel.app/)

## ขั้นตอนการติดตั้ง
> ต้องทำการติดตั้งโปรแกรม REST API ก่อน https://github.com/ford-tanya/helpdesk-api.git
1.  ทำการ clone โปรเจคจาก GitHub โดยใช้คำสั่งใน Command Prompt หรือ Terminal:
    ```bash
    git clone https://github.com/ford-tanya/helpdesk-app.git
    ```

2. เข้าไปยัง directory ของโปรเจคที่ clone มาโดยใช้คำสั่งต่อไปนี้:   
	```bash
    cd helpdesk-app
    ```
    
3. ติดตั้ง packet ทั้งหมดของโปรเจค:
	```bash
    npm install
    ```
4. ทำการรัน server ด้วยคำสั่งต่อไปนี้:
	```bash
    npm start
    ```


## Objective  
พัฒนาโปรแกรมในลักษณะของระบบบริหารจัดการติดตามเรื่องร้องเรียนของผู้ใช้งานโดยมีการรับและแก้ไขปัญหาที่เกิดขึ้น

## Major functions

 1. Function Requirements 
	  - สร้างคำร้องขอใหม่ด้วยข้อมูลเหล่านี้ ชื่อเรื่อง คำอธิบาย ข้อมูลติดต่อ, เวลาที่สร้างขึ้น, เวลาการอัปเดตตั๋วล่าสุด
	  - อัปเดตข้อมูลและสถานะของคำร้องขอ (รอดําเนินการ ยอมรับ แก้ไขแล้ว ปฏิเสธ)
	  - แสดงรายการและจัดเรียงคำร้องขอ ตามสถานะ อัปเดตล่าสุด
	  - เมื่อสร้างคำร้องขอแล้ว จะไม่สามารถลบได้ไม่ว่าด้วยวิธีใดก็ตาม
2. Non function Requirements
	  - สามารถเลือกเวิร์กโฟลว์ UI ประเภคอะไรก็ได้: ผู้พัฒนาเลือกเวิร์กโฟลว์ UI ประเภค Tables
	  - เลือกการเก็บฐานข้อมูลรูปแบบไหนก็ได้ SQL และ NoSQL, ไฟล์ JSON, Firebase หรือเก็บในหน่วยความจำ 
	     ผู้พัฒนาเลือกเก็บฐานข้อมูลรูปแบบ SQL 
