import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {LoaderService} from "./loader.service";

@Component({
  selector: 'mgd-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit, OnDestroy {

  public subscription$!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef) {
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.subscription$ = this.loaderService.loading$
      .subscribe((status: boolean) => {
        status ? this.renderer.addClass(this.element, 'show') : this.renderer.removeClass(this.element, 'show');
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
