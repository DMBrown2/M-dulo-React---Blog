import { useState } from 'react';
import { useEffect } from 'react';
import PostsList from './components/PostsList/PostsList';
import Title from './components/title/title';
import { useForm } from 'react-hook-form'; // importamos el hook
import axios from "axios";

const POSTS = []

const URL = "https://67cb83443395520e6af589f6.mockapi.io/api/v1/"

function App() {
  const [posts, setPosts] = useState([]);


  //El hook useEffect se ejecuta

  useEffect(() => {
    getPosts()
  }, [])
  // console.log("Creando componente App")

  // console.log("Creando componente App")
  async function getPosts() {

    try {
      //Vamos a colocal el codigo que queremos que se ejecute.
      // console.log("Obteniendo posts...")
      const { data } = await axios.get(`${URL}/posts`)
      // console.log(data)

      setPosts(data)
    }
    catch (error) {
      console.warn(error)
      alert("Ocurrió un error al obtener los posts ")
    }
  }

  // function getPosts() {
  //   // console.log("Obteniendo posts...")

  //   axios.get(`${URL}/posts`)
  //     .then(response => {
  //       const postsMockapi = response.data;
  //       setPosts(postsMockapi);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }


  function markAsRead(id) {
    console.log(" marcar como leido", id)

    const post = posts.find((post) => {
      if (post.id === id) {
        return true
      }
    })

    post.alreadyRead = true
    // const copiaPosts = [...posts]
    // setPosts(copiaPosts)

    setPosts([...posts])

  }


  const { register, handleSubmit, formState: { errors, isValid } } = useForm();


  //funcion para agregar posts
  async function addPost(data) {
    
    try {
      console.log(data);

      //toma la data del form y agrega un nuevo post
      // evento.preventDefault()
      // const elements = evento.target.elements;
      // const {title, email, description} = elements;
  
      // #Creamos el nuevo post en base a la data del form.
      const newPost = {
        title: data.title,
        email: data.email,
        description: data.description,
        // id: Date.now(),
        alreadyRead: false,
        active: true, //podemos no usarlo.
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(`${URL}/posts`, newPost)

      // getPosts()
      setPosts(  [  ...posts, response.data  ]  )
console.log(response.data)

    } catch (error) {
      console.log(error)
      alert("No se pudo crear el post")
    }

    // //hacemos una copia del array de posts y le agregamos el nuevo post
    // const postCopy = [...posts];
    // postCopy.push(post);
    // //Actualizamos el estado de posts. 
    // setPosts(postCopy);
  }

  async function deletePost(id) {
    console.log("Borrar post con id", id)

    try {
      const confirmDelete = confirm("Está seguro que desea borrar?")
      if(confirmDelete) {
        await axios.delete(`${URL}/posts/${id}`)

        getPosts()
      }
    } catch (error) {
      console.log(error)
      alert("No se pudo borrar el post")
    }

    // //Buscamos la posición en el elemento 
    // const indice = posts.findIndex(post => post.id === id)

    // //Generar una copia del array de posts (estado)
    // const postCopy = [...posts]
    // postCopy.splice(indice, 1) // eliminamos en elemento 
    // setPosts(postCopy) //Actualizamos el estado de posts.

  }

  return (
    <>
      <Title titulo="Blog App" subtitle="Un blog para estar comunicados." />
      <Title titulo="Crea tu primer post" />
      <form className='post-form' onSubmit={handleSubmit(addPost)}>

        <div className="input-group">
          <label htmlFor="title">Titulo del post</label>
          <input type="text" {...register("title", {
            required: 'El titulo es requerido',
            minLength: { value: 6, message: 'El titulo debe tener al menos 6 caracteres' },
            maxLength: { value: 30, message: 'El titulo debe tener menos de 30 caracteres' }
          })} id='title' />
        </div>

        {/* //Mostramosmensaje de error si el titulo no cumple con las reglas. */}
        {errors.title && <span className='error'>{errors.title.message}</span>}

        <div className="input-group">
          <label htmlFor="email">Correo electronico</label>
          <input type="email" {...register("email", {
            required: 'El email es requerido',
            minLength: { value: 6, message: 'El email debe tener al menos 6 caracteres' },
            maxLength: { value: 30, message: 'El email debe tener menos de 30 caracteres' }
          })} id='email' placeholder='user@email.com' />
        </div>
        <div className="input-group">
          <label htmlFor="description">Post</label>
          <textarea {...register("description", {
            required: 'La descripcion es requerida',
            minLength: { value: 6, message: 'La descripcion debe tener al menos 6 caracteres' },
            maxLength: { value: 200, message: 'La descripcion debe tener menos de 200 caracteres' }
          })} id='description'></textarea>
        </div>

        <button className='button' type="submit" disabled={!isValid}>Crear post</button>
      </form>
      <Title titulo="Posts creados" />

      <PostsList posteos={posts} markAsRead={markAsRead} deletePost={deletePost} />
    </>
  )
}

export default App
