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

  function getPosts() {
    // console.log("Obteniendo posts...")

    axios.get(`${URL}/posts`)
      .then(response => {
        const postsMockapi = response.data;
        setPosts(postsMockapi);
      })
      .catch(error => {
        console.error(error);
      })
  }


  function markAsRead(id) {
    // console.log(" marcar como leido", id)

    const post = posts.find((post) => {
      if(post.id === id) {
        return true
      }
      })

      post.alreadyRead = true
      // const copiaPosts = [...posts]
      // setPosts(copiaPosts)

      setPosts([...posts])

  }


  const { register, handleSubmit, formState: {errors,isValid} } = useForm();


  function addPost(data) {
    console.log(data);
    //toma la data del form y agrega un nuevo post
    // evento.preventDefault()
    // const elements = evento.target.elements;
    // const {title, email, description} = elements;

    // #Creamos el nuevo post en base a la data del form.
    const post = {
      title: data.title,
      email: data.email,
      description: data.description,
      id: posts.length + 1
    }
    //hacemos una copia del array de posts y le agregamos el nuevo post
    const postCopy = [...posts];
    postCopy.push(post);
    //Actualizamos el estado de posts. 
    setPosts(postCopy);
  }

  return (
    <>
      <Title titulo="Blog App" subtitle="Un blog para estar comunicados."/>
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

        <button className='button' type="submit" disabled={ !isValid }>Crear post</button>
      </form>
      <Title titulo="Posts creados" />

      <PostsList posteos={posts} markAsRead={markAsRead} />
    </>
  )
}

export default App
