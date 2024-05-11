<template>
    <main class="form-signin w-25 m-auto">
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating" style="margin-bottom: 4px;">
                <input type="text" class="form-control" placeholder="Nickname" v-model="_nickname">
                <label>Nickname</label>
            </div>

            <div class="form-floating" style="margin-bottom: 4px;">
                <input type="email" class="form-control" placeholder="name@example.com" v-model="_email">
                <label>Email address</label>
            </div>

            <div class="form-floating" style="margin-bottom: 4px;">
                <input type="tel" class="form-control" placeholder="Number" v-model="_number">
                <label>Number</label>
            </div>

            <div class="form-floating" style="margin-bottom: 4px;">
                <input type="password" class="form-control" placeholder="Password" v-model="_pass">
                <label>Password</label>
            </div>

            <div class="form-floating">
                <input type="password" class="form-control" placeholder="Password" v-model="_repPass">
                <label>Repeat password</label>
            </div>
            <h4 style="color: red">{{ errormsg }}</h4>
            <button class="btn btn-login w-100 py-2" type="button" style="margin-top: 4px;"
                @click="Submit">Signup</button>
            <p class="mt-5 mb-3 text-body-secondary">© 2024</p>
        </form>
    </main>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const _nickname = ref('');
const _email = ref('');
const _number = ref('');
const _pass = ref('');
const _repPass = ref('');
var errormsg = ref('');

function Submit() {


    var acc = {
        "name": _nickname.value,
        "email": _email.value,
        "number": _number.value,
        "password": _pass.value
    }

    if (!validatePhoneNumber(acc.number))
    {
        errormsg.value = "Некоректний формат номеру"
        return;
    }
    else if (acc.name.length == 0)
    {
        errormsg.value = "Некоректний формат імені";
        return;
    }
    else if (acc.password != _repPass.value)
    {
        errormsg.value = "Паролі не співпадають";
        return;
    }

        axios.post('http://localhost:5173/api/account', acc)
            .then(() => {
                router.push('/');
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
            });
}

function validatePhoneNumber(input) {
    const pattern = /^\+\d+(\s\d+)*$/;
    return pattern.test(input);
}

</script>