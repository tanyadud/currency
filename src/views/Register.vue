<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="$v.email.$model"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$model && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Empty field</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Fill correct email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="$v.password.$model"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$model && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Empty field</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$model && !$v.password.minLength"
        >Min length should be more than 6</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="$v.name.$model"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Empty field</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {minLength: minLength(6), required},
    name: {required},
    agree: {checked: v => (v)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)

        this.$router.push('/')
      } catch (e) {

      }
    }
  }
}
</script>
