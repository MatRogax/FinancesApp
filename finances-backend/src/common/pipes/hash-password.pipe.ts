import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
    private readonly saltRounds = 8;
    async transform(value: any): Promise<string> {

        if (value.password) {
            value.password = await bcrypt.hash(value.password, this.saltRounds);
        }
        return value;
    }
}
