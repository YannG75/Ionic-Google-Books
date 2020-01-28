<template>
    <div class="ion-page">

        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Commune</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <img class="" src="../assets/Article_TECHGOUV.jpg" alt="">
            <ion-item>
                <ion-label position="floating">Code postal ou Nom de commune</ion-label>
                <ion-input type="text" @input="zipcode = $event.target.value"></ion-input>
            </ion-item>

            <div class="ion-padding">
                <span style="color: gray; font-weight: lighter"> Trouvez la commune recherchée à l'aide de son code postal ou de son nom complet ou partiel</span>
            </div>

            <div class="ion-padding">
                <ion-button expand="block" type="submit" @click="getComune" class="ion-no-margin">Rechercher
                </ion-button>
            </div>

            <ion-card v-for="t in towns">
                <ion-card-header>
                    <ion-card-title>{{t.nom}}</ion-card-title>
                    <ion-card-subtitle>{{t.code}}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    Population : {{t.population}}
                </ion-card-content>
            </ion-card>
        </ion-content>


    </div>

</template>

<script>

    import router from "../router"

    export default {
        name: "home",

        data() {
            return {
                zipcode: null,
                towns: [],

            }
        },

        methods: {
            alert(msg) {
                return this.$ionic.alertController
                    .create({
                        header: 'Attention !',
                        subHeader: '',
                        message: msg,
                        buttons: ['OK'],
                    })
                    .then(a => a.present())
            },
            getComune() {
                let count = /^[0-9]{5}$/
                if (parseInt(this.zipcode)) {
                    if (count.test(this.zipcode.trim())){
                        this.$request.get('https://geo.api.gouv.fr/communes?codePostal=' + this.zipcode)
                            .then(res => {
                                this.towns = []
                                res.data.forEach(com => {
                                    this.towns.push(com)
                                })
                                if (this.towns.length === 0)
                                    this.alert('ce code postal ne correspond à aucune commune')

                            })
                    }
                    else {
                        this.alert('Veuillez rentrer un code postal valide !')
                    }


                }

                else {
                    if (this.zipcode == null)
                        this.alert('Veuillez renter un code postal existant et sans lettres ! ')

                    else {
                        let matches = /[a-zA-Z\-]+/g
                        let noAt = /[@]/
                        let number = /[0-9]/
                        this.$request.get('https://geo.api.gouv.fr/communes?nom=' + this.zipcode)
                            .then(res => {

                                if (matches.test(this.zipcode) && !noAt.test(this.zipcode) && !number.test(this.zipcode)){
                                    this.towns = []
                                    res.data.forEach(com => {
                                        this.towns.push(com)
                                    })
                                }
                                else this.alert('Veuillez n\'utiliser qu\'uniquement des chiffres ou uniquement des lettres ! ')

                            })
                    }

                }

            }

        }
    };


</script>
