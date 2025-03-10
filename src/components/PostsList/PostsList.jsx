import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostsList.css';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function PostsList({posteos, markAsRead}) {
  return (
    <div className="post-list">

        {
            posteos.map(post=> (
                //devuelve un componente con la info de cada post. 
                <div className="post-container" key={post.id}>  
                <div className="post-header">
                    <h2>{post.title}
                        {post.alreadyRead && <span className='read'>✅</span>}
                    </h2>
                    <div className="post-info">
                        <div className="post-date">
                            Creado: 20-06-25
                        </div>
                        <div className="post-user">
                            {post.email}
                        </div>
                    </div>
                </div>
                <div className="post-body">
                    <p>{post.description}</p>
                </div>
                <div className="post-footer">
                    <div className="buttons-container"
                    title='Marcar como leido'
                    onClick={ () => markAsRead(post.id)}>
                        <button className='button-xs'>
                            <FontAwesomeIcon icon={faEye}  />
                        </button>
                        <button className='button-xs button-secondary'>
                            <FontAwesomeIcon icon={faBan} />
                        </button>
                        <button className='button-xs button-danger'>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
            ))
        }
        </div>
  )
}
