import {
  faEye,
  faEyeSlash,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { emailPattern } from "../../Regex/Regex";
import * as XLSX from 'xlsx';


import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
import { Pie } from 'react-chartjs-2';



export default function GestionUser({ id }) {
  const [loading, setLoading] = useState(true);
  
  const [showUser, setShowUser] = useState(false);
  const [showEditModalUsers, setShowEditModalUsers] = useState(false);

  const handleCloseEdit = () => setShowUser(false);
  const handleShowEdit = () => setShowUser(true);
  const handleCloseEditUser = () => setShowEditModalUsers(false);
  const [showBlokUser, setShowBlokUser] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleCloseBlokUser = () => setShowBlokUser(false);
  const handleShowBlokUser = () => setShowBlokUser(true);
  const handleCloseDetails = () => setShowUserDetails(false);


  //*********** Initialisation des etat **************************//
  const [users, setUsers] = useState([]);
  const [usersBlock, setUsersBlock] = useState([]);

  const [categories, setCategories] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [searchValueUser, setSearchValueUser] = useState("");


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  //*********** Lister les categories **************************//
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);
        setLoading(false)

        console.log(categories);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

    
    //*********** Lister les entreprises **************************//
    const fetchEntreprises = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "Admin") {
          const response = await axios.get(
            "http://localhost:8000/api/entreprises",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEntreprises(response.data.entreprises);
          setLoading(false)
  
          console.log(entreprises);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchEntreprises();
    }, []);
    

     //*********** Lister les particiapnst **************************//
    const fetchUsers = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "Admin") {
          const response = await axios.get(
            "http://localhost:8000/api/participants",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(response.data.participants);
          setLoading(false)
  
          console.log(users ,'ici users du users');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchUsers();
    }, []);

  
 
   //*********** etat pour ajout particippant **************************//
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
   
    entreprise_id: "",
    
  });

  
   //*********** etat initialiser à vide au depart pour modifier categorie**************************//
  const [editUserData, setEditUserData] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    
    entreprise_id: "",
  });

  
// Funtion qui permet de recuperer les information du user sur le quel on a cliquer
  const handleShowEditUsers = (user) => {
    console.log(user, 'user edit')
    if (user && user.entreprise_id) {
      setEditUserData({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        entreprise_id: user.entreprise_id,
      });
      setShowEditModalUsers(true);
    } else {
      console.error("Catégorie non définie pour le particiapnt à modifier.");
      // Autres actions nécessaires en cas d'erreur...
    }
  };


  //*********** Function pour creer un participant **************************//
  const ajouterUser = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem('tokencle')
    
    if(userData.nom === "" || userData.prenom === "" || userData.email === "" 
    || userData.password === "" || userData.entreprise_id === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    if (!emailPattern.test(userData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "L'adresse e-mail saisie n'est pas valide!",
      });
      return;
    }
    if ((userData.password.trim().length < 8)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "le password doit etre plus de 8!",
      });
      return
      
    }
    
      try {
        if (token || role==="Admin"){
          const response = await axios.post(
            "http://localhost:8000/api/participant/create",
            userData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if(response.data.status === 420){
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "L'e-mail existe déja!",
            });
            console.log(response.status, "status 420")
            return;
          }
          
  
          if (response.status === 200) {
            setUsers([...users, response.data]);
            setLoading(false)
            setUserData({
              nom: "",
              prenom: "",
              email: "",
              password: "",
             
              entreprise_id: "",
            });
  
            Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "user ajoutée avec succès!",
            });
            console.log(response, "response ok"); 
  
            handleCloseEdit();
            fetchUsers();
  
           
          } else {
            console.error("Erreur dans l'ajout du participant");
          }
        }
        
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    
  
  };


  //*********** Function pour telecharger fichier exel  **************************//
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Veuillez sélectionner un fichier Excel!",
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (token || role === "Admin") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const users = XLSX.utils.sheet_to_json(sheet);

          // Envoyer le fichier directement au serveur
          axios.post('http://localhost:8000/api/import/participants', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            }
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "Liste utilisateur téléversée avec succès!",
            });
            console.log(response.data);
            // Mettez à jour les données si nécessaire
            fetchUsers();
            // fetchCategories();
            fetchEntreprises();
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "L'email existe déjà!",
              });
            
            }  else if(error.response && error.response.status === 423) {
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Le mot de passe doit avoir au mmoins 8 caracteres!",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Une erreur s'est produite lors téleversement de la liste",
              });
            }
            console.error(error);
          });
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops!",
      //   text: "Une erreur s'est produite lors du traitement du fichier.",
      // });
      
      if (error.response.status === 423) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Mot de passe invalide!",
        });
        return  
      }
      console.error(error);
    }
  };
 

  
 

   //*********** Function pour modifier un particiapnt **************************//
  const modifierUser = async (id) => {
    const token = localStorage.getItem('tokencle')
    const role = localStorage.getItem("rolecle");
    if(editUserData.nom === "" || editUserData.prenom === "" || editUserData.email === "" 
     || editUserData.entreprise_id === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    if (!emailPattern.test(editUserData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "L'adresse e-mail saisie n'est pas valide!",
      });
      return;
    }
      try {
        
          if (token || role==="Admin"){

            const response = await axios.post(
              `http://localhost:8000/api/participant/update/${editUserData.id}`,
              editUserData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`
                },
              }
            );
           
  
            if (response.status === 200) {
              console.log(response, 'response modif')
              const dataEv = response.data.participants
              const updatedUsers = users.map((user) =>
              
                user.id === editUserData.id ? response.data.participants : user
              );
              // console.log('updatedMaisons:', updatedMaisons);
  
              setUsers(updatedUsers);
              setEditUserData(response.data.participants);
              setLoading(false)
              fetchUsers();
              handleCloseEditUser();
              Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "user mise à jour avec succès!",
              });
           
              console.log('Valeur de categories_id après la requête:', editUserData.categorie_id);
            } else {
              console.error("Erreur lors de la modification de la user");
            }
          
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    }
    
  


//*********** Function pour supprimer un particiapnt **************************//
  const supprimerUser = async (id) => {
    const token = localStorage.getItem('tokencle');
    const role = localStorage.getItem("rolecle");
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir bloque le participant?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
        if (token || role === "Admin") {
            const response = await axios.post(
                `http://localhost:8000/api/participant/${id}/bloquer`,
                {}, // Passer un objet vide en tant que corps de la requête
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Bloquer l'utilisateur avec succès
                const userId = response.data.id; // Assurez-vous de récupérer l'ID correctement
                console.log("Utilisateur bloqué avec succès :", userId);

                // Supprimer l'utilisateur de la liste des utilisateurs
                setUsers(users.filter((user) => user.id !== userId))
                setLoading(false)
                        Swal.fire({
                            icon: "success",
                            title: "Succès!",
                            text: "Utilisateur bloqué avec succès!",
                        });
                fetchUsers();
                fetchUsersBlock()
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  }
});
};



//*********** Function pour lister les  particiapnts bloqués **************************//
const fetchUsersBlock = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Admin") {
      const response = await axios.get(
        "http://localhost:8000/api/liste/participants/bloquer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsersBlock(response.data.participants);
      setLoading(false)

      console.log(response ,'liste participant blok');
      console.log(usersBlock ,' blok');
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
};
useEffect(() => {
  fetchUsersBlock();
}, []);

//*********** Function pour debloqué les  particiapnts blockés **************************//

const debloquerUser = async (id) => {
  const token = localStorage.getItem('tokencle');
  const role = localStorage.getItem("rolecle");
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir bloque le participant?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#004573',
    cancelButtonColor: '#f00020',
    confirmButtonText: "Oui, j'accepte!",
  }).then(async (result) => {
    if (result.isConfirmed) {
  try {
      if (token || role === "Admin") {
          const response = await axios.post(
              `http://localhost:8000/api/participant/${id}/debloquer`,
              {}, // Passer un objet vide en tant que corps de la requête
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          
          if (response.status === 200) {
              // Débloquer l'utilisateur avec succès
              const userId = response.data.id;
              setLoading(false)
              Swal.fire({
                  icon: "success",
                  title: "Succès!",
                  text: "participant débloqué avec succès!",
              });

              fetchUsers();
              fetchUsersBlock();
              handleCloseBlokUser();
          } else {
              console.error("Erreur lors du déblocage du user");
          }
      }
  } catch (error) {
      console.error("Une erreur s'est produite :", error);
  }
}
});
};




 

 // function la recherche
 const handleSearchChange = (event) => {
   setSearchValueUser(event.target.value);
 };

 // faire le filtre des maison par addrsse
 const filteredUsers = users.filter(
   (user) =>
     user &&
     user.nom &&
     user.nom.toLowerCase().includes(searchValueUser.toLowerCase())
 );
 const displayUsers = searchValueUser === "" ? users : filteredUsers;


   const [currentPage1, setCurrentPage1] = useState(1);
 const usersParPage= 5;

 // pagination
 const indexOfLastUser = currentPage1* usersParPage;
 const indexOfFirstUser = indexOfLastUser - usersParPage;
 const currentUsers = filteredUsers.slice(
   indexOfFirstUser,
   indexOfLastUser
 );

 const totalPaginationPagesUser = Math.ceil(users.length / usersParPage);



 //  pour le champ recherche
 const [searchValueUserBlock, setSearchValueUserBlock] = useState("");

 // function la recherche des participant bloquer
 const handleSearchChangeBlok = (event) => {
   setSearchValueUserBlock(event.target.value);
 };

 // faire le filtre des participant par nom bloquer
 const filteredUsersBlok = usersBlock.filter(
   (user) =>
     user &&
     user.nom &&
     user.nom.toLowerCase().includes(searchValueUserBlock.toLowerCase())
 );
 const displayUsersBlok = searchValueUserBlock === "" ? usersBlock : filteredUsersBlok;


   const [currentPage, setCurrentPage] = useState(1);
 const usersBlokParPage= 10;

 // pagination
 const indexOfLastUserBlok = currentPage* usersBlokParPage;
 const indexOfFirstUserBlok = indexOfLastUserBlok - usersBlokParPage;
 const currentUsersBlok = filteredUsersBlok.slice(
   indexOfFirstUserBlok,
   indexOfLastUserBlok
 );

 const totalPaginationPages = Math.ceil(usersBlock.length / usersBlokParPage);




 const [userQuestionsAndAnswers, setUserQuestionsAndAnswers] = useState([]);
 console.log({userQuestionsAndAnswers: Object.keys(userQuestionsAndAnswers?.[0] ?? {})});

 const fetchUserQuestionsAndAnswers = async (id) => {
   const token = localStorage.getItem("tokencle");
   const role = localStorage.getItem("rolecle");
   
   try {
     if (token && role === "Admin") {
       const response = await axios.get(`http://localhost:8000/api/users/evaluations/${id}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       console.log(response, 'response fetchquestionAnswer voir');
       
       if (response.data && response.data.user && Array.isArray(response.data.user)) {
        setLoading(false)
         console.log("Données de l'API récupérées :", response.data.user);
         return response.data.user;
         
       } else {
         console.error("La réponse de l'API n'est pas un tableau ou est vide :", response.data.user);
         return [];
       }
     }
   } catch (error) {
     console.error("Erreur lors de la récupération des questions et réponses:", error);
   }
   return [];
};




const handleShowUserDetails = async (user) => {
  if (user && user.entreprise_id) {
    setEditUserData({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      // categorie_id: user.categorie_id,
      entreprise_id: user.entreprise_id,
    });

    try {
      const questionsAndAnswers = await fetchUserQuestionsAndAnswers(user.id);
      console.log(questionsAndAnswers, 'questionsAndAnswers')
      setUserQuestionsAndAnswers(questionsAndAnswers);
      console.log(userQuestionsAndAnswers, 'userQuestionsAndAnswers')
      setShowUserDetails(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des questions et réponses:", error);
      // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
    }
  } else {
    console.error("erreur voir liste.");
    // Autres actions nécessaires en cas d'erreur...
  }
};

 
      let questionCounter = 1;

      // function pour recuperer le niveau et l'afficher insuffisant moyen bien et exelent selon l'intervale du  pourcentage
      const comparePourcentages = (pourcentageA, pourcentageB) => {
        const nombreA = parseInt(pourcentageA, 10);
        const nombreB = parseInt(pourcentageB, 10);
        return nombreA - nombreB;
      };

      const getNiveauLabel = (niveau) => {
        if (niveau.includes('%')) {
          // Comparaison des pourcentages en tant que chaînes
          if (comparePourcentages(niveau, '0%') >= 0 && comparePourcentages(niveau, '49%') <= 0) {
            return 'Insuffisant';
          } else if (comparePourcentages(niveau, '50%') >= 0 && comparePourcentages(niveau, '59%') <= 0) {
            return 'Moyen';
          } else if (comparePourcentages(niveau, '60%') >= 0 && comparePourcentages(niveau, '79%') <= 0) {
            return 'Bien';
          } else if (comparePourcentages(niveau, '80%') >= 0 && comparePourcentages(niveau, '100%') <= 0) {
            return 'Excellent';
          } else {
            return 'Non évalué';
          }
        } else {
          // Si la chaîne ne contient pas le symbole de pourcentage (%), vous pouvez ajouter le traitement supplémentaire ici
          return 'Non évalué';
        }
      };
      
      
      const processEvaluation = (evaluation) => {
        return {
          ...evaluation,
          niveauLabel: getNiveauLabel(evaluation.niveau) 
        };
      };
      
      const processEvaluations = (evaluations) => {
        return evaluations.map(evaluation => {
          return {
            ...processEvaluation(evaluation), // Traitement de chaque évaluation
            questions_reponses: evaluation.questions_reponses.map(qr => {
              return {
                ...qr,
                reponses: qr.reponses.map(reponse => {
                  return {
                    ...reponse,
                    niveauLabel: getNiveauLabel(reponse.niveau) // Ajoutez le label du niveau ici pour chaque réponse
                  };
                })
              };
            })
          };
        });
      };




      // **********************************Chart******************************************//

const prepareChartData = (userData) => {
  const responseCounts = userData?.questions_reponses?.map(r => r.count);
  const labels = userData.reponses.map(r => r.reponse);

  return {
    labels: labels,
    datasets: [
      {
        data: responseCounts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
    datalabels: {
      color: 'red',
      font: {
        size: 12,
      },
      formatter: (value, context) => `${context.dataIndex}: ${Math.round(value)}%`,
    },
  },
  layout: {
    padding: {
      top: 30,
    },
  },
};

const chartContainerStyle = {
  width: '250px',  
  height: '250px', 
  // margin: 'auto'  
};


  

  return (
    <div className="" style={{marginTop:'70px'}}>
       {loading ? (
        <LoadingBox />
         ) : (
        <div className="container">
          <div className="d-flex justify-content-around mt-1">
            <div>
              <Button
                variant="primary"
                onClick={handleShowEdit}
                className="ms-4"
                style={{ backgroundColor: "#004573", border: "none" }}
                id="buttonAjouter"
              >
                Ajouter un participant
              </Button>
            </div>
            <div>
            
          <Form onSubmit={handleSubmit}>
            <div className="d-flex">
            <div>
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange}
                style={{ backgroundColor: "#fff", border: "1px solid  #004573", color:'#004573', width:'200px',
                borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px', padding:'2px 2px' }} />
            </div>
            <div>
              <button type="submit" 
                  style={{ backgroundColor: "#004573", border: "none", color:'white', 
                  borderTopRightRadius:'10px', borderBottomRightRadius:'10px', padding:'5px'}}>
                  Téléverser
              </button>
              </div>

            </div>
          </Form>
          {message && <p>{message}</p>}
            </div>
            <div className="">
              <Button
                variant="primary"
                onClick={handleShowBlokUser}
                className="ms-4"
                style={{ backgroundColor: "#004573", border: "none" }}
                id="buttonAjouter"
              >
                Liste participant bloqué
              </Button>
            </div>
            
            
          </div>
          <div className="mt-4 ms-3  me-3">
          <div className="flex-grow-1 d-flex justify-content-end ">
              <div className="champsRecherche mt-2 mb-3 w-50">
                <Form>
                  <div
                    className="input-group flex-nowrap "
                    style={{ borderColor: "#004573" }}
                  >
                    <Form.Control
                      type="search"
                      className="form-control w-50   "
                      placeholder="Rechercher participant"
                      aria-label="user"
                      aria-describedby="addon-wrapping"
                      value={searchValueUser}
                      onChange={handleSearchChange}
                    />
                    <span
                      className="input-group-text text-white me-4"
                      id="addon-wrapping"
                      style={{ backgroundColor: "#004573" }}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                  </div>
                </Form>
              </div>
            </div>
            <h3>Liste des participants</h3>
            <table className="table border  border-1">
              <thead
                className=""
                id="hearder-color"
                style={{ backgroundColor: "#004573" }}
              >
                <tr>
                  
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Voir les reponses des participant
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Prenom
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Email
                  </th>
                  
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Entreprise
                  </th>
                  <th
                    className="d-flex  justify-content-center "
                    style={{
                      backgroundColor: "#004573",
                      color: "#fff",
                      marginLeft: "3rem",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              { currentUsers &&
                  currentUsers.map((user) => ( 
                  <tr key={user && user.id} >
                    <td>
                      <Button
                      variant="primary"
                      onClick={() => handleShowUserDetails(user)}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #004573",
                        color: "#004573",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    </td>
                    <td>{user &&  user.nom}</td>
                    <td>{user &&  user.prenom}</td>
                    <td>{user &&  user.email}</td>
                  
                    <td>{user &&  user.entreprise.nom}</td>

                        <td className=" d-flex justify-content-evenly">
                          <Button
                            variant="primary"
                            // onClick={handleShowEdit}
                            onClick={() => handleShowEditUsers(user)}
                            style={{
                              backgroundColor: "#fff",
                              border: "1px solid #004573",
                              color: "#004573",
                            }}
                            id="buttonModifier"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                          <Button
                            onClick={() => supprimerUser(user.id)}
                            style={{
                              backgroundColor: "#fff",
                              border: "1px solid #004573",
                              color: "#004573",
                            }}
                          >
                            <FontAwesomeIcon icon={faLock} />
                          </Button>

                        
                        </td>
                    
                  </tr>
                ))} 
                
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage1}
              totalPaginationPages={totalPaginationPagesUser}
              setCurrentPage={setCurrentPage1}
              />  
          </div>

          {/********************************** * modal debut  ajouter participant************************************/}
          <Modal show={showUser} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un participant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={userData.nom}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        nom: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    value={userData.prenom}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        prenom: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={userData.email}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Label>Mot de passe</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      value={userData.password}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          password: e.target.value,
                        });
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                    />
                    <span className="password-toggle" onClick={togglePasswordVisibility} style={{color:'#004573'}}>
                      {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </span>
                  </div>
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={userData.entreprise_id}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        entreprise_id: e.target.value,
                      });
                    }}
                  >
                    <option>Choisir une entreprise</option>
                    {entreprises &&
                      entreprises.map((entrepriseel, index) => (
                        <option key={index} value={entrepriseel.id}>
                          {entrepriseel.nom}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterUser}
              style={{
                backgroundColor: "#004573",
                border: "none",
                width: "130px",
              }}
            >
              Ajouter
            </Button>
            <Button
              variant="primary"
              onClick={handleCloseEdit}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #004573",
                width: "130px",
                color: "#004573",
              }}
            >
              Fermer
            </Button>
          </Modal.Footer>
          </Modal>
          {/*************************** * modal fin ajouter user *****************************************************/}

          {/*************************** modal debut modifier user *********************************************************/}
          <Modal
            show={showEditModalUsers}
            onHide={handleCloseEditUser}
            id="buttonModifier"
          >
            <Modal.Header closeButton>
              <Modal.Title>Modifier un participant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editUserData && editUserData.nom && (
                <Form>
                  <div className="d-flex justify-content-around " style={{gap:'10px'}}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={editUserData.nom}
                        onChange={(e) => {
                          setEditUserData({
                            ...editUserData,
                            nom: e.target.value,
                          });
                        
                        }}
                      />
                      
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Prenom</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={editUserData.prenom}
                        onChange={(e) => {
                          setEditUserData({
                            ...editUserData,
                            prenom: e.target.value,
                          });
                          
                        }}
                      />
                      
                    </Form.Group>
                  </div>
                  
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder=""
                        value={editUserData.email}
                        onChange={(e) => {
                          setEditUserData({
                            ...editUserData,
                            email: e.target.value,
                          });
                        
                        }}
                      />
                    
                    </Form.Group>
                
                  <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Entreprise</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="w-100"
                        // value={editUserData.categories_id}
                        value={editUserData.entreprise_id || ""}
                        onChange={(e) => {
                          setEditUserData({
                            ...editUserData,
                            entreprise_id: e.target.value,
                          });
                        
                        }}
                      >
                        {/* recuperer la categorie selectionner par défaut pour la modifier */}
                      {entreprises &&
                          entreprises.map((entrepriseel, index) => {
                            return (
                              <option key={index} value={entrepriseel.id}>
                                {entrepriseel.nom}
                              </option>
                            );
                          })}
                      </Form.Select>
                      
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={modifierUser}
                style={{
                  backgroundColor: "#004573",
                  border: "none",
                  width: "130px",
                }}
              >
                Modifier
              </Button>
              <Button
                variant="primary"
                onClick={handleCloseEditUser}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #004573",
                  width: "130px",
                  color: "#004573",
                }}
              >
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        
          {/* modal fin modifier user */}

          {/* participant blok ***************************************************************/}
          <Modal show={showBlokUser} onHide={handleCloseBlokUser} id="buttonAjouter" size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Liste des participants bloqué</Modal.Title>

                
              </Modal.Header>
              <div className="flex-grow-1 d-flex justify-content-end ">
              <div className="champsRecherche mt-2 mb-3 w-50">
                <Form>
                  <div
                    className="input-group flex-nowrap "
                    style={{ borderColor: "#004573" }}
                  >
                    <Form.Control
                      type="search"
                      className="form-control w-50   "
                      placeholder="Rechercher participant bloquer"
                      aria-label="user"
                      aria-describedby="addon-wrapping"
                      value={searchValueUserBlock}
                      onChange={handleSearchChangeBlok}
                    />
                    <span
                      className="input-group-text text-white me-4"
                      id="addon-wrapping"
                      style={{ backgroundColor: "#004573" }}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                  </div>
                </Form>
              </div>
                </div>
              <Modal.Body>
              <table className="table border  border-1">
              <thead
                className=""
                id="hearder-color"
                style={{ backgroundColor: "#004573" }}
              >
                <tr>
                  
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Prenom
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Email
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Catégorie
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Entreprise
                  </th>
                  <th
                    className="d-flex  justify-content-center "
                    style={{
                      backgroundColor: "#004573",
                      color: "#fff",
                      marginLeft: "3rem",
                    }}
                  >
                    Debloquer
                  </th>
                </tr>
              </thead>
              <tbody>
                

              { currentUsersBlok &&
                  currentUsersBlok.map((user) => ( 
                  <tr key={user && user.id} >
                    <td>{user &&  user.nom}</td>
                    <td>{user &&  user.prenom}</td>
                    <td>{user &&  user.email}</td>
                    {/* <td>{user &&  user.categorie.nom}</td> */}
                    <td>{user &&  user.entreprise.nom}</td>

                        <td className=" d-flex justify-content-evenly">
                          
                          <Button
                            onClick={() => debloquerUser(user.id)}
                            style={{
                              backgroundColor: "#fff",
                              border: "1px solid #004573",
                              color: "#004573",
                            }}
                          >
                            <FontAwesomeIcon icon={faLockOpen} />
                          </Button>

                        
                        </td>
                    
                  </tr>
                ))} 
                
              </tbody>
            </table>
              
            <Pagination
              currentPage={currentPage}
              totalPaginationPages={totalPaginationPages}
              setCurrentPage={setCurrentPage}
              /> 
              </Modal.Body>
              
            </Modal>
          {/* participant blok **************************************************************/}


          <Modal show={showUserDetails} onHide={handleCloseDetails} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Evaluation reçu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
              {userQuestionsAndAnswers.length > 0 && userQuestionsAndAnswers.map((item, index) => {
                    return Object.keys(item).map((userId) => {
                        const userData = item[userId];
                        let questionCounter = 1; // Initialize question counter inside the map function

                        return (
                            <div key={`${index}-${userId}`} className=" ">
                                <div className="card mb-3 p-3">
                                <h5 className="card-text" style={{color:'#004573'}}><strong>Évaluation:</strong> {userData?.evaluation.titre}</h5>
                                    <p className="card-text"><strong>Évaluateur:</strong> {userData?.user.prenom} {userData?.user.nom}</p>
                                    
                                    {userData?.questions_reponses?.map((qr, qrIndex) => (
                                        <div key={qrIndex} className="mt-1 mb-4">
                                            <p className="card-text ">
                                                <strong>{questionCounter++}-Question:</strong> {qr?.reponse?.questions_evaluation?.nom}
                                            </p>
                                            <p className="card-text">
                                                <strong>Réponse:</strong> {qr?.reponse?.reponse}
                                            </p>
                                        </div>
                                    ))}
                                    <p className="card-text mt-3"><strong>Commentaire:</strong> {userData?.commentaire}</p>
                                    {/* <p className="card-text"><strong>Niveau:</strong> {userData?.niveau}</p> */}
                                    <p className="card-text"><strong>Niveau:</strong> {getNiveauLabel(userData?.niveau)}</p>
                                </div>
                            </div>
                        );
                    });
              })}
              
              </div>

            
          </Modal.Body>
          
        </Modal>

        </div>
        )}

    </div>
  );
}

