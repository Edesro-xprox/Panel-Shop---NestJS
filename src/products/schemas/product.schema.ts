import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
    @Prop({ type: String })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    status: boolean;

    @Prop()
    supplier: string;

    @Prop()
    type: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);