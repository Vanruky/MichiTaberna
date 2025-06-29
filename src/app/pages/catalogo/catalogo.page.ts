import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {
  productos = [
    {
      titulo: 'Tapa antipolvo',
      descripcion: 'Tapa antipolvo para celular con diseño de gatito.',
      precio: 850,
      imagen: 'assets/img/tapa.jpg',
      meGusta: false,
    },
    {
      titulo: 'Michi—Lámpara',
      descripcion: 'Lámpara de mesa noctura de madera.',
      precio: 19990,
      imagen: 'assets/img/lampara.jpg',
      meGusta: false,
    },
    {
      titulo: 'Pegatinas',
      descripcion: '100 pegatinas diferentes de Glowy el gatito negro',
      precio: 2990,
      imagen: 'assets/img/pegatinas.jpg',
      meGusta: false,
    }
  ];

  error: string = '';
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private geolocation: Geolocation 
  ) {}

  async ionViewWillEnter() {
    const logged = await this.authService.isLoggedIn();
    if (!logged) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.apiService.getMealCategories().subscribe({
      next: (res) => {
        const productosAPI = res.categories.map((cat: any) => ({
          titulo: cat.strCategory,
          descripcion: cat.strCategoryDescription?.slice(0, 80) + '...',
          imagen: cat.strCategoryThumb,
          precio: Math.floor(Math.random() * 10000) + 1000,
          meGusta: false
        }));
        
        this.productos = [...this.productos, ...productosAPI];
      },
      error: (err) => {
        console.error('Error al obtener datos del API', err);
        this.error = 'No se pudo cargar el catálogo extra.';
      }
    });
  }

  irHome() {
    this.router.navigate(['/home']);
  }

  toggleLike(producto: any) {
    producto.meGusta = !producto.meGusta;
  }

  comprar(producto: any) {
    console.log('Comprar:', producto);
  }

  agregarCarrito(producto: any) {
    console.log('Agregar al carrito:', producto);
  }

  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.error = '';
      console.log('Latitud:', this.latitude);
      console.log('Longitud:', this.longitude);
    }).catch((error) => {
      this.error = 'Error al obtener ubicación: ' + error.message;
      console.error('Error geolocalización', error);
    });
  }
}
