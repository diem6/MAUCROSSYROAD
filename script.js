document.addEventListener('DOMContentLoaded', () => {
    const nhanVat = document.getElementById('player');
    const vatCan = document.getElementById('obstacle');
    const vachDich = document.getElementById('goal');
    const khuVucGame = document.getElementById('game-area');
    const thongBao = document.getElementById('message');
    let viTriY = 10;  
    const kichThuocNhanVat = 30;
    const tocDo = 30; 
    let gameKetThuc = false;
    let vongLapGame; 

    function capNhatViTri() {
        nhanVat.style.bottom = viTriY + 'px'; 
    }

    function kiemTraVaCham() {
        if (gameKetThuc) return;

        const toaDoNhanVat = nhanVat.getBoundingClientRect();
        const toaDoVatCan = vatCan.getBoundingClientRect(); 
        const toaDoVachDich = vachDich.getBoundingClientRect();

        if (
            toaDoNhanVat.left < toaDoVatCan.right &&
            toaDoNhanVat.right > toaDoVatCan.left &&
            toaDoNhanVat.top < toaDoVatCan.bottom &&
            toaDoNhanVat.bottom > toaDoVatCan.top
        ) {
            ketThucGame("GAME OVER! Ban da va cham.");
            return;
        }

        if (toaDoNhanVat.top <= toaDoVachDich.bottom) { 
            ketThucGame("CHUC MUNG! Ban da qua duong.");
        }
    }

    function ketThucGame(thongDiep) {
        gameKetThuc = true;
        thongBao.textContent = thongDiep + " (Game da ket thuc.)"; 
        document.removeEventListener('keydown', xuLyPhim); 
        vatCan.style.animationPlayState = 'paused'; 
        clearInterval(vongLapGame); 
    }

    function xuLyPhim(event) {
        if (gameKetThuc) return;

        const chieuCaoKhuVuc = khuVucGame.clientHeight;
        switch (event.key) {
            case 'ArrowUp':
                viTriY = Math.min(chieuCaoKhuVuc - kichThuocNhanVat, viTriY + tocDo);
                break;
            case 'ArrowDown':
                viTriY = Math.max(0, viTriY - tocDo);
                break;
        }
        
        capNhatViTri(); 
        kiemTraVaCham(); 
    }
    
    function batDauVongLap() {
        vongLapGame = setInterval(kiemTraVaCham, 50); 
    }

    capNhatViTri();
    document.addEventListener('keydown', xuLyPhim); 
    batDauVongLap(); 
});