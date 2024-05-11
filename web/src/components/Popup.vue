<template>
    <div v-if="isVisible" class="popup">
        <div class="-modal">
            <div class="modal_content">
                <div class="modal_header">
                    <h4 class="modal_title">{{ buttonLabel }} контакт</h4>
                    <button @click="close" type="button" id="close" class="btn btn-login py-2"
                        style="width:40px">X</button>
                </div>
                <div class="modal_body">
                    <form action="#" class="modal-form">
                        <input required placeholder="Ім'я" name="name" type="text" v-model="localName"
                            style="margin-right: 5px;">
                        <input required placeholder="Номер" name="phone" type="phone" v-model="localNumber"
                            style="margin-right: 5px;">
                        <button @click="saveAndClose" type="button" id="btn-modal" style="margin-bottom: 5px;"
                            class="btn btn-login py-2">{{ buttonLabel }}</button>
                    </form>
                    <p id="ErrorMessage">{{ errormsg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    props: ['isVisible', 'contact', 'userId'],
    data() {
        return {
            localName: this.contact.name,
            localNumber: this.contact.number,
            localId: this.contact.id,
            errormsg: ""
        }
    },
    watch: {
        contact: {
            handler(newVal) {
                this.localName = newVal.name;
                this.localNumber = newVal.number;
                this.localId = newVal.id;
            },
            deep: true
        }
    },
    methods: {
        close() {
            this.localName = '';
            this.localNumber = '';
            this.localId = '';
            this.errormsg = '';
            this.$emit('close');
        },
        saveAndClose() {
            if (!this.validatePhoneNumber(this.localNumber) && !this.localName) {
                this.errormsg = "Некоректний формат імені та номеру";
            }
            else if (!this.validatePhoneNumber(this.localNumber)) {
                this.errormsg = "Некоректний формат номеру";
            }
            else if (!this.localName) {
                this.errormsg = "Некоректний формат імені";
            }
            else {

                if (this.isContactEmpty())
                    this.save();
                else
                    this.update();

            }
        },
        validatePhoneNumber(input) {
            const pattern = /^\+\d+(\s\d+)*$/;
            return pattern.test(input);
        },
        save() {
            axios.post('http://localhost:5173/api/contact', { name: this.localName, number: this.localNumber, id: this.userId })
                .then(() => {
                    this.$emit('update-table');
                    this.close();
                })
                .catch(error => {
                    console.error('Ошибка при отправке данных:', error);
                });
        },
        update() {
            axios.put(`http://localhost:5173/api/contact/${this.localId}`, { name: this.localName, number: this.localNumber })
                .then(() => {
                    this.$emit('update-table');
                    this.close();
                })
                .catch(error => {
                    console.log(this.contact)
                    console.error('Ошибка при отправке данных:', error);
                });
        },
        isContactEmpty() {
            return !this.contact || (!this.contact.name && !this.contact.number);
        },
    },
    computed: {
        buttonLabel() {
            return !this.isContactEmpty() ? "Редагувати" : "Додати";
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-inner {
    padding: 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>