import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product.interface';
import { ValidateFormService } from 'src/app/core/services/validateForm/validate-form.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  loader: boolean = false;
  editMode: boolean = false;
  productForm!: FormGroup;

  @Input() editDate: Product = {};
  @Output() addProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() updateProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private fb: FormBuilder,
    private validateFormService: ValidateFormService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    if (this.editDate && Object.keys(this.editDate).length > 0) {
      this.loader = true;
      this.editProductForm(this.editDate);
    } else {
      this.productForm.patchValue({ id: this.generateUUIDV4() });
    }
  }

  generateUUIDV4(): string {
    const s: any = []
    const hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
    // eslint-disable-next-line no-bitwise
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    const uuid = s.join('')
    return uuid
  }

  editProductForm(product: Product) {
    this.editMode = true;
    this.productForm.patchValue(product);
    this.loader = false;
  }

  isFieldValid(field: string) {
    return !this.productForm.get(field)!.valid && this.productForm.get(field)!.touched;
  }

  submitProductForm() {
    if (this.productForm.valid) {
      if (this.editMode) {
        this.updateProduct.emit(this.productForm.value);
      } else {
        this.addProduct.emit(this.productForm.value);
      }
    } else {
      this.validateFormService.validateAllFormFields(this.productForm);
    }
  }

}
