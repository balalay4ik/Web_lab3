<template>
    <main class="page">
        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <td>Nickname</td>
                                <td>{{ nickname }}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{{ email }}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{{ phone }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { computed } from 'vue';
import store from '../store/auth';

export default {
    setup() {
        // Create computed properties to reactively access the Vuex state
        const nickname = computed(() => store.getters.currentUser?.name || 'None');
        const email = computed(() => store.getters.currentUser?.email || 'None');
        const phone = computed(() => store.getters.currentUser?.number || 'None');

        // Return the computed properties so they can be used in the template
        return {
            nickname,
            email,
            phone
        };
    }
}
</script>