<template>
    <div class="ion-page">

        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Région</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <img class="" src="../assets/Article_TECHGOUV.jpg" alt="">
            <ion-item >
                <ion-label position="floating">Région</ion-label>
                <ion-select type="select" @ionChange="zipcode = $event.target.value">
                    <ion-select-option v-for="r in district " :value="r.code">
                        {{r.code}} - {{r.nom}}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <div class="ion-padding">
                <span style="color: gray; font-weight: lighter"> Trouvez tout les départements correspondant a la région cherché</span>
            </div>

            <div class="ion-padding">
                <ion-button expand="block" type="submit" @click="GetDepartment" class="ion-no-margin">Rechercher
                </ion-button>
            </div>

            <ion-card v-for="d in department" >
                <ion-card-header>
                    <ion-card-title>{{d.nom}}</ion-card-title>
                    <ion-card-subtitle>code département : {{d.code}}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    code Région : {{d.codeRegion}}
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
                district: [],
                department: []

            }
        },

        mounted() {
                this.$request.get('https://geo.api.gouv.fr/regions')
            .then(res => {
                this.district = res.data
            })
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
            GetDepartment() {

                if (parseInt(this.zipcode) && this.district.map(x => x.code).includes(this.zipcode)) {
                    this.$request.get('https://geo.api.gouv.fr/regions/'+ this.zipcode +'/departements')
                        .then(res => {
                            this.department = []
                            res.data.forEach(com => {
                                this.department.push(com)
                            })
                            if(res.data.length === 0)
                                this.alert('Aucune donné n\'a été trouvé pour cette région !')

                        })
                        .catch(() => {
                            this.alert('Veuillez renter une région existante et sans lettres !')
                        })
                }

                else {
                    if (this.zipcode == null)
                        this.alert('Veuillez remplir le champ !')

                    else
                        this.alert('Veuillez n\'utiliser qu\'uniquement des chiffres et entrer une région valide :)')


                }

            }

        }
    };


</script>