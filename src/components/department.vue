<template>
    <div class="ion-page">

        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Département</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <img class="" src="../assets/Article_TECHGOUV.jpg" alt="">
            <ion-item>
                <ion-label position="floating">département</ion-label>
                <ion-select type="number"  @ionChange="zipcode = $event.detail.value">
                    <ion-select-option v-for="d in department" :value="d.departmentCode">
                        {{d.departmentCode}} - {{d.departmentName}}
                    </ion-select-option>
                </ion-select>
            </ion-item>

            <div class="ion-padding">
                <span style="color: gray; font-weight: lighter"> Trouvez toutes les communes correspondant au département cherché</span>
            </div>

            <div class="ion-padding">
                <ion-button expand="block" type="submit" @click="GetComune" class="ion-no-margin">Rechercher
                </ion-button>
            </div>

            <ion-card v-for="t in towns" >
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
    import department from "../assets/ressources/department.json"

    export default {
        name: "departement",

        data() {
            return {
                zipcode: null,
                towns: [],
                department

            }
        },

        mounted() {

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
            GetComune() {

                if (this.department.map(x => x.departmentCode).includes(this.zipcode)) {
                    this.$request.get('https://geo.api.gouv.fr/departements/' + this.zipcode + '/communes')
                        .then(res => {
                            this.towns = []
                            res.data.forEach(com => {
                                this.towns.push(com)
                            })
                            if(res.data.length === 0)
                                this.alert('Aucune donné n\'a été trouvé pour ce département !')

                        })
                        .catch(() => {
                            this.alert('Veuillez renter un département existant et sans lettres !')
                        })
                }

                else {
                    if (this.zipcode == null)
                        this.alert('Veuillez remplir le champ !')

                    else
                        this.alert('Veuillez n\'utiliser qu\'uniquement des chiffres et un bon numéro de département ! ;)')


                }

            }

        }
    };


</script>
