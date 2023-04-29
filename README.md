# SJTUPlus


## How to startup

1. Install dependencies
   ```
   $ pip install -r requirements.txt
   ```
2. Create database
   ```
   $ python manage.py makemigrations
   $ python manage.py migrate
   ```
3. Create Superuser
   ```
   $ python manage.py createsuperuser
   ```
4. Connect database
   ```
   edit /lifelogger/setting.py -> DATABASES
   ```
5. Run the server
   ```
   # To run a debug server on port 8000
   $ python manage.py runserver 8000
   ```

   

I18n文件夹中含有翻译配置，可以在里面编辑词典；
theme.json里面是颜色配置，使用颜色的时候不要直接用颜色名，先在theme里面添加再引用theme中的变量名，变量名统一为primary, secondary等
