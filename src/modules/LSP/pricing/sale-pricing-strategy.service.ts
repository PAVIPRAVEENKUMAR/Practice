import { Injectable } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Injectable()

export class BadSalePricingStrategy extends PricingService {
  
}

@Injectable()

export class SalePricingStrategy implements PricingService {
  calculatePrice(basePrice: number): number {
    
    return basePrice * 0.8; 
  }
}