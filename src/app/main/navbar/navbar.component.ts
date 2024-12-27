import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private el: ElementRef,
    private route:Router
  ){}
  
  ngOnInit(): void {
    // this.setActiveLink();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateNavbarAnimation();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    setTimeout(() => {
      this.updateNavbarAnimation();
    }, 500);
  }

  updateNavbarAnimation(): void {
    const tabsNewAnim = document.getElementById('navbarSupportedContent');
    if (tabsNewAnim) {
      const activeItemNewAnim = tabsNewAnim.querySelector('.active'); 
      if (activeItemNewAnim) {
        const activeWidthNewAnimHeight = activeItemNewAnim.clientHeight;
        const activeWidthNewAnimWidth = activeItemNewAnim.clientWidth;
        const itemPosNewAnimTop = activeItemNewAnim.getBoundingClientRect().top;
        const itemPosNewAnimLeft = activeItemNewAnim.getBoundingClientRect().left;

        const horiSelector = document.querySelector('.hori-selector') as HTMLElement;
        if (horiSelector) {
          const mediaQuery = window.matchMedia('(min-width: 992px)');
          if(mediaQuery.matches){
            horiSelector.style.top = `${itemPosNewAnimTop}px`;
          }else{
            horiSelector.style.top = `${itemPosNewAnimTop-20}px`;
          }
          horiSelector.style.left = `${itemPosNewAnimLeft}px`;
          horiSelector.style.height = `${activeWidthNewAnimHeight}px`;
          horiSelector.style.width = `${activeWidthNewAnimWidth}px`;
        }
      }
    }
  }

  setActiveLink(routeName:MouseEvent): void {
    const ReActive = this.el.nativeElement.querySelectorAll('.nav-item');
    ReActive.forEach((link: HTMLElement) => {
      link.classList.remove('active');
      console.log(link);
    });
    const idName =  (routeName.currentTarget as HTMLElement).id
    this.route.navigate(['/'+idName])
    const element = this.el.nativeElement.querySelector(`#${idName}`);
        if (element) {
            element.classList.add('active');
            console.log(routeName.currentTarget as HTMLElement);
        }
    this.updateNavbarAnimation();
  }

  toggleNavbar(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse) {
      navbarCollapse.classList.toggle('show');
    }
    setTimeout(() => {
      this.updateNavbarAnimation();
    });
  }
}
