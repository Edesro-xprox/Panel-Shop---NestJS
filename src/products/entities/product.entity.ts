// Entidad Product.
// Representa la forma que tendrá un producto dentro de la API.
// Por ahora es una clase simple en memoria. Si luego agregas una BD
// (Mongo, Postgres, etc.), esta clase se convierte en @Schema() o @Entity()
// sin cambiar el controlador.

export class Product {
  // _id: identificador único generado por el backend (uuid).
  _id: string;

  name: string;

  // image: ruta pública del archivo, ej: "/images/laptop/<id>.jpg".
  image: string;

  type: string;

  description: string;

  price: number;

  // status: vigencia del producto. true = vigente / false = no vigente.
  status: boolean;

  supplier: string;
}
