export default function serializeFormData (formData: FormData) {
    const obj = {};
    formData.forEach( (val, key) => {
        obj[key] = val;
    } );
    return obj;
}
