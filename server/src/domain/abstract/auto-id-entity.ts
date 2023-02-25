import { PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base-time-entity.js";

export abstract class AutoIdEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
