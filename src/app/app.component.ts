import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front-icfes';
  bandera: boolean = false;

  ngOnInit(): void {
    this.detectNavigationEvent();
    this.detectBrowserClose();
  }

  detectNavigationEvent() {
    this.bandera = true;
    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const lastNavigationEntry = navigationEntries[navigationEntries.length - 1];
      if (lastNavigationEntry.type === 'reload') {
        console.log('El navegador se ha recargado.');
        this.bandera = false;
      } else if (lastNavigationEntry.type === 'navigate') {
        this.bandera = false;
        console.log('La página se ha cargado por primera vez.');
      }
    } else {
      
      console.log('No hay métricas de navegación disponibles.');
    }
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   // Mostrar mensaje personalizado en el navegador
  //   $event.returnValue = '¡Ten cuidado! Si cierras esta página, se perderán los datos no guardados.';
  // }

  detectBrowserClose() {
    window.addEventListener('beforeunload', () => {
      if (this.bandera) {
        this.cleanLocalStorage();
        console.log('El navegador se está cerrando.');
      }
      // Aquí puedes agregar la lógica que necesites para manejar el cierre del navegador
    });
  }

  private cleanLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('edad');
    localStorage.removeItem('menu');
  }
}
