<template>
   <div id="app">
      <header>
         <nav class="navbar navbar-expand-lg bg-white">
            <a class="navbar-brand" href="#"><img src="./assets/logo.png" width="170" alt="Bird Office Logo"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div class="navbar-nav ml-auto">
                  <a class="nav-item nav-link" href="#">+33 1 11 11 11 11</a>
                  <a class="nav-item nav-link" href="#">Contact</a>
                  <a class="nav-item nav-link" href="#">FAQ</a>
                  <a class="nav-item nav-link" href="#">Partager votre espace</a>
                  <a class="nav-item nav-link" href="#">Inscription</a>
                  <a class="nav-item nav-link" href="#">Connexion</a>
               </div>
            </div>
         </nav>      
      </header>

      <div class="container">

            <div class="col-md-12 desc-text-wrapper">

               <h1>Location de salle de réunion,<br class="destroy"> séminaire, formation ou<br class="destroy"> conférence sur Bird Office</h1>
                
               <p>Bird Office est le service permettant aux entreprises de réserver simplement le lieu idéal<br class="destroy"> pour leurs réunions, séminaires, conférences ou formations.</p>

            </div>

            <div class="col-md-12">
               <div class="form-wrapper">

                  <form>
                     <div class="input-group">
                        <div class="input-group-prepend">
                           <span class="input-group-text fa fa-search" id="searchTextPrepend">
                              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                 <defs>
                                     <path d="M42.1554031,34.9065234 L41.0658662,34.9065234 L40.6871355,35.2824881 C42.0250429,36.8426048 42.838765,38.8651306 42.838765,41.0811274 C42.838765,46.0070894 38.8456261,50 33.9193825,50 C28.9931389,50 25,46.0070894 25,41.0811274 C25,36.1551655 28.9931389,32.1622549 33.9193825,32.1622549 C36.135506,32.1622549 38.1567753,32.9745583 39.7169811,34.3110171 L40.0957118,33.9350523 L40.0957118,32.848322 L46.9540309,26 L49,28.0458522 L42.1554031,34.9065234 L42.1554031,34.9065234 Z M33.9193825,34.9065234 C30.5080617,34.9065234 27.7444254,37.6700017 27.7444254,41.0811274 C27.7444254,44.490881 30.5080617,47.2557315 33.9193825,47.2557315 C37.329331,47.2557315 40.0943396,44.490881 40.0943396,41.0811274 C40.0943396,37.6700017 37.329331,34.9065234 33.9193825,34.9065234 L33.9193825,34.9065234 Z" id="path-1"></path>
                                 </defs>
                                 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                     <g id="Page---Empty-Copy" transform="translate(-190.000000, -494.000000)">
                                         <g id="Search-Box" transform="translate(165.000000, 468.000000)">
                                             <mask id="mask-2" fill="white">
                                                 <use xlink:href="#path-1"></use>
                                             </mask>
                                             <use id="Mask" fill="#4A4A4A" transform="translate(37.000000, 38.000000) scale(1, -1) translate(-37.000000, -38.000000) " xlink:href="#path-1"></use>
                                         </g>
                                     </g>
                                 </g>
                              </svg>
                           </span>
                        </div>
                        <input type="text" class="form-control form-control-lg" id="searchText" v-model="searchQuery" placeholder="Essayer une ville, une adresse, un quartier, …" aria-describedby="searchTextPrepend" required>
                        <div class="input-group-append">
                           <button id="searchBtn" class="btn btn-primary" @click.prevent="searchPhotos" type="submit">Trouver une salle</button>
                        </div>          
                     </div>
                  </form><!-- /form -->
                  
                  <div class="search-result" v-if="noResults == false">
                     <hr>
                     <ul class="list-inline">
                        <li class="list-inline-item" v-for="(item, index) in searchResults">
                           <img :src="item.url" :alt="item.title" />
                           <span>{{ item.title }}</span>
                        </li>
                     </ul>
                  </div>
                  <div class="search-result-no-results" v-else-if="noResults == true">
                     <hr>
                     <div class="alert alert-warning">Pas de résultat ! Veuillez essayer avec un autre mot clé.</div>
                  </div>

               </div>
            </div>

      </div>
           
   </div><!-- #app -->
</template>

<script>
   export default {
      name : 'app',
      data () {
         return {
            searchQuery : '',
            searchResults : {},
            noResults : null,
            api_ID : '563492ad6f91700001000001426149350eab43ccba40f4ee2c2bf474'
         }
      },
      methods : {
         searchPhotos : function() {

            var vm = this,
                maxResults = 6;  //  Max results

            this.$http.get('https://api.pexels.com/v1/search', {params: {query: vm.searchQuery, per_page: maxResults, page: 1}, 
                 headers: {'Authorization': vm.api_ID}}).then(response => {

                  //console.log(response.body);

               if (response.body.photos.length > 0) {

                  vm.noResults = false;
                  vm.searchResults = [];
                  
                  for (var i = 0; i < response.body.photos.length; i++) {
                   
                     var photo = response.body.photos,
                         photographer = photo[i].photographer,
                         photo_url = photo[i].src.portrait,
                         photo_title = vm.searchQuery,
                         photo_id = photo[i].id;

                     this.$set(vm.searchResults, vm.searchResults.length, { photographer : photographer, url : photo_url, title : photo_title });  // ajoute l'item à l'array des résultats            

                  }

               } else {

                  vm.noResults = true; // si pas de résultats, affiche un div d'alerte

               }

            }, response => {
                  // callback d'erreur
                  alert("ERREUR ! Veuillez contacter un administrateur.");
            });

         },  
         toggleSearch : function () {  //  toggle la search ou non
            this.searchPhotos = !this.searchPhotos
         }
      }
   }
</script>

<style scoped lang="scss">
  $main_txt_color: #1B2733;

   #app {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: $main_txt_color;
   }

   /* Navbar, header… */
   .navbar-nav .nav-link { font-size: 14px; }

   /* Container */
   .container { margin-top: 95px }
   .container h1 { font-weight: bold; font-size: 54px; text-align: left; }

   /* Desc Text */
   .desc-text-wrapper p { padding: 20px 0 }

   /* Form */
   .input-group-text { background: #FFF }

   .form-wrapper {
      padding: 10px; 
      border: 1px solid #C1C7CD;
      border-radius: 8px;
   }
   .form-wrapper input, 
   .input-group-text { border: none }

   #searchBtn { font-weight: bold }

   .form-wrapper .input-group > .input-group-append > .btn { border-radius: 4px; }

   /* Search Result */
   .search-result ul { margin-bottom: 0 }
   .search-result ul li { max-width: 14.9%; margin-bottom: 0 }

   /*.search-result .list-inline-item { width: 14% }*/
   .search-result .list-inline-item img { width: 100% }
   .search-result .list-inline-item ul { margin: 0 }
   .search-result .list-inline-item span { 
      font-weight: bold;
      margin-top: 10px;
      float: left;
   }

   /* Misc */
   h1, h2 {
      font-weight: normal;
   }

   ul {
      list-style-type: none;
      padding: 0;
   }

   li {
      display: inline-block;
      margin: 0 10px;
   }

   a {
      color: $main_txt_color;
   }

   .bg-white {
      border-bottom: 1px solid #D8D8D8;
   }

   @media only screen and (max-width: 1024px) {

      .destroy { display: none }

   }
</style>