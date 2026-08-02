import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '@env/environment';
import { NavigationLink } from '@shared/interfaces/navigation-link';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './navigation.component.css',
    imports: [RouterLink, RouterLinkActive],
})
export class NavigationComponent {
    isMenuOpen = false;
    navigationLinks: NavigationLink[] = environment.navigation;

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }
}
