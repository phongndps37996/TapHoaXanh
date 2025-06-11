import { Address } from 'src/address/entities/address.entity';
import { AbstractEntity } from 'src/database/database.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class Users extends AbstractEntity<Users> {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  image: string;

  @Column()
  sell_ticket: boolean;

  @Column()
  role: string;

  @Column()
  voucher_id: string;

  @OneToMany(() => Address, (address) => address.users)
  address: Address[];
}
