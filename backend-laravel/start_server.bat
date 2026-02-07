@echo off
set PHPRC=C:\xampp\php
echo Starting Laravel Server with XAMPP Config...
php artisan serve --host=0.0.0.0 --port=8000
pause
