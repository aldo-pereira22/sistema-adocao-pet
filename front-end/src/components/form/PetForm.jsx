import {useState} from 'react'
import formStyles from './Form.module.css'
import Input from './Input'
import Select from './Select'

function PetForm({handleSubmit, petData, btnText }){

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e){

        setPet({...pet, images: [...e.target.files]})
    }
    function handleChange(e){
        setPet({...pet, [e.target.name]: [...e.target.value]})


    }

    function handleColor(e){
        setPet({...pet, color:e.target.options[e.target.selectedIndex]})

    }
    function submit(e){
        e.preventDefault()
        console.log(pet )
        // handleSubmit(pet)
    }
    return (

<form onSubmit={submit} className={formStyles.form_container}>

    <div>
        {   preview.length > 0 
            ? preview.map((image, index) => (
                <p> Teste</p>
            )):
            pet.images && 
            pet.images.map((image, index) => (
                <p> Teste</p>
            ))
        }
    </div>
        <Input
            text="Imagens do Pet"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
        />
        <Input
            text="Nome do pet"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            handleOnChange={handleChange}
            value={pet.name || ''}
        />

        <Input
            type="text"
            name="age"
            placeholder="Digite a idade"
            handleOnChange={handleChange}
            value={pet.age || ''}
        />

        <Input
            text="Peso do pet"
            type="number"
            name="weight"
            placeholder="Digite o peso"
            handleOnChange={handleChange}
            value={pet.weight || ''}
        />

        <Select
            name="color"
            text="Selecione a cor"
            options={colors}
            handleOnchange={handleColor}
            value={pet.color || ''}
        />
        <input type="submit" value={btnText} />
</form>
    )
}

export default PetForm