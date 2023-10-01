# SPA Comments

**Project Description**

This project is a web-based commenting system that allows users to post comments. It includes various functionalities to ensure data integrity, security and user-friendliness.

**Technology stack:**

- **Backend Laravel version 9.19**
- **Vue3 frontend**
- **PostgreSQL Database**

**Key Functions**

1. **Comment Submission:**
    - Users can leave comments on the platform.
    - The comment submission form includes the following fields:
        - User Name (mandatory, alphanumeric characters only)
        - E-mail (mandatory, email format)
        - Home Page (optional, URL format)
        - CAPTCHA (mandatory, alphanumeric characters displayed as an image)
        - Text (mandatory, plain text message with restricted HTML tags)

2. **Comment Storage:**
    - All user-entered comments are stored in a relational database.
    - User data, including customer identification information, is securely stored.

3. **Comment Management:**
    - Multiple comments can be added for each record in a cascading manner.
    - Capitalized comments (non-replies) are displayed in a sortable table format with sorting options by User Name, E-mail, and date added (both ascending and descending).
    - Pagination is implemented, with 25 messages per page.
    - Default sorting is Last-In-First-Out (LIFO).

4. **Security Features:**
    - User inputs are validated both on the server and client sides.
    - HTML tags are restricted to allowed ones and checked for proper closure to ensure valid XHTML.

5. **User Interface:**
    - Visual effects are added for image and text file viewing.

6. **JavaScript and File Handling:**
    - Users can add images or text files to their posts.
    - Images are resized to a maximum size of 320x240 pixels if they exceed this dimension. Supported file formats include JPG, GIF, and PNG.
    - Text files are limited to 100 KB in size and must be in TXT format.
    - Viewing of files includes visual effects for enhanced user experience.

7. **Regular Expressions:**
    - Users are allowed to use specific HTML tags in their messages: a, code, i, strong.
    - There is validation to ensure proper tag closure and valid XHTML.

8. **JavaScript and AJAX:**
    - Data input validation occurs on both the server and client sides.
    - Message preview function is implemented without page reloading.
    - A panel with buttons for HTML tags ([i], [strong], [code], [a]) is provided.
    - Visual effects are incorporated for a smoother user experience.

# Installation (production)

### Create non-root User

1. Create user and set his password
```
sudo adduser laravel --disabled-password
```

2. Add root privileges for user
```
sudo usermod -aG sudo laravel
```

3. Copy access key to laravel .ssh directory
```
sudo mkdir /home/laravel/.ssh
sudo chown laravel:laravel /home/laravel/.ssh
sudo cp .ssh/authorized_keys /home/laravel/.ssh/authorized_keys
sudo chown laravel:laravel /home/laravel/.ssh/authorized_keys
```

4. Remove password prompt for laravel user (add at the end of file)
```
sudo visudo
----
laravel ALL=(ALL) NOPASSWD: ALL
```

5. Login as laravel user and edit (add at the top):
```
nano ~/.bashrc
----
cd ~/laravel-spa-comments/
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
```

### Add swap file (optional) ([source](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04))

1. Create a 4 Gigabyte file, enabling the swap file, set up the swap space
```
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

2. Make the swap file permanent (add at the end of file)
```
sudo nano /etc/fstab
----
/swapfile   none    swap    sw    0   0
```

3. Tweak your swap settings
```
sudo sysctl vm.swappiness=10
sudo sysctl vm.vfs_cache_pressure=50
```

4. Make changes permanent (add at the end of file)
```
sudo nano /etc/sysctl.conf
----
vm.swappiness=10
vm.vfs_cache_pressure = 50
```

### Install Docker and Docker-compose

1. Update packages database
```
sudo apt update
```

2. Add GPG key from official docker repository and add docker repository
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

3. Update packages database
```
sudo apt update
```

4. Install docker
```
sudo apt install docker-ce
```

5. Add current user to docker group
```
sudo usermod -aG docker ${USER}
```

6. Restart ssh session

7. Download docker compose
```
sudo curl -L https://github.com/docker/compose/releases/download/v2.0.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

8. Next we'll set the permissions
```
sudo chmod +x /usr/local/bin/docker-compose
```

### Clone this repository

1. Clone repository
```
git clone https://github.com/vladanokhin/laravel-spa-comments.git
```

### Configure laravel and docker

1. Copy laravel `.env.example` file to `.env` and change it's variables
```
cp ~/laravel-spa-comments/.env.example ~/laravel-spa-comments/.env
```

2. Copy docker `docker/.env.example` to `docker/.env` and change it's variables
```
cp ~/laravel-spa-comments/docker/.env.example ~/laravel-spa-comments/docker/.env
```

3. Copy `docker/nginx/sites/site.conf.example-dev` to `docker/nginx/sites/site.conf` and change example.com to current domain
```
cp ~/laravel-spa-comments/docker/nginx/sites/site.conf.example-dev ~/laravel-spa-comments/docker/nginx/sites/site.conf
```

4. Start docker containers
```
cd ~/laravel-spa-comments/docker
docker-compose up -d
```

5. Add executing of containers and the startup
```
sudo crontab -e
---
# Start docker-compose at boot
@reboot cd /home/laravel/laravel-spa-comments/docker/ && /usr/local/bin/docker-compose up -d

#Logs rotate
@weekly /home/laravel/laravel-spa-comments/logs_rotate.sh > /dev/null 2>&1
```

### Init laravel


1Enter workspace container
```
cd /home/laravel/laravel-spa-comments/docker/ 
docker-compose exec workspace bash
```

3. Install composer and nmp packages
```
composer install
npm install
```

4. Compile css and js files
```
npm run build
```

5. Create database
```
php artisan migrate
```
