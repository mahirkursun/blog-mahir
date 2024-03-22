# blog-mahir

# Projeyi Çalıştırmak İçin Adımlar

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Proje Klasörünü İndirme**
   - Projeyi GitHub üzerinden klonlayın veya ZIP olarak indirin.
   ```bash
   git clone <repo-link>
   
2. **Gerekli Paketleri Yükleme**
- Terminal veya Komut İstemi'ni kullanarak proje dizinine gidin.
   ```bash
   cd server
   
- Proje dizininde npm paketlerini yüklemek için aşağıdaki komutu kullanın:
   ```bash
   npm install
   
- Terminal veya Komut İstemi'ni kullanarak proje dizinine gidin.
   ```bash
   cd client
   
- Proje dizininde npm paketlerini yüklemek için aşağıdaki komutu kullanın:
   ```bash
   npm install

3. **Verileri API ile Çekme**
   - Proje dizininde, verileri localhost API ile çekmek için şu komutu kullanın:
   ```bash
   npm run start
Bu komut, projedeki data.json dosyasındaki verileri localhost üzerinde çalışan basit bir API ile sağlar.

4. **Projeyi Çalıştırma**
   - Ana proje dizininde, aşağıdaki komutu kullanarak projeyi başlatın:
   ```bash
   npm start
- Bu komut, projenizi yerel ortamda çalıştıracaktır.

Artık projeniz yerel ortamınızda çalışıyor olmalıdır. Tarayıcınızdan http://localhost:3000 adresine giderek projeyi görüntüleyebilirsiniz.