export interface Escaneo {
    text?: string;
    format?: string;
    cancelled?: boolean;
}

export interface Producto {
    key?: string | null;
    codigoBarra: string;
    precio: number;
    nombre: string;
    descripcion: string;

}