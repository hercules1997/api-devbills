

type CategoyProps = {
    _id?: string
    title: string
    color: string
}

export class Category {
    public _id?: string
    public title: string
    public color: string

    constructor({_id, title, color }: CategoyProps) {
        this._id = _id
        this.title = title
        this.color = color.toUpperCase()
    }
}