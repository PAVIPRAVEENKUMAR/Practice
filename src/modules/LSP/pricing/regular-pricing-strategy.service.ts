import { Injectable } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Injectable()

export class BadRegularPricingStrategy extends PricingService {
  
}

@Injectable()
//Good ✅
export class RegularPricingStrategy implements PricingService {
  calculatePrice(basePrice: number): number {
    // Logic to calculate the regular price
    return basePrice;
  }

  public fetchInternalPricing(): void {}
}