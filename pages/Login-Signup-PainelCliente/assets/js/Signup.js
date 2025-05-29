
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    
    // Aplicar máscaras
    if (typeof VMasker !== 'undefined') {
        VMasker(document.getElementById('mobile')).maskPattern('(99) 99999-9999');
        VMasker(document.getElementById('cpf')).maskPattern('999.999.999-99');
        VMasker(document.getElementById('birthdate')).maskPattern('99/99/9999');
        VMasker(document.getElementById('cep')).maskPattern('99999-999');
        
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            VMasker(phoneField).maskPattern('(99) 9999-9999');
        }
        
        const emergencyPhoneField = document.getElementById('emergency_contact_phone');
        if (emergencyPhoneField) {
            VMasker(emergencyPhoneField).maskPattern('(99) 99999-9999');
        }
    }

    // Buscar CEP
    document.getElementById('cep').addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('address').value = data.logradouro || '';
                        document.getElementById('neighborhood').value = data.bairro || '';
                        document.getElementById('city').value = data.localidade || '';
                        document.getElementById('state').value = data.uf || '';
                        
                        // Focar no campo número se o endereço foi preenchido
                        if (data.logradouro) {
                            document.getElementById('number').focus();
                        }
                    }
                })
                .catch(error => {
                    console.log('Erro ao buscar CEP:', error);
                });
        }
    });

    // Validação customizada
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Limpar validações anteriores
        form.classList.remove('was-validated');
        requiredFields.forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });

        // Validar campos obrigatórios
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.add('is-valid');
            }
        });

        // Validar email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailPattern.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // Validar CPF
        const cpf = document.getElementById('cpf');
        if (cpf.value && !isValidCPF(cpf.value)) {
            cpf.classList.add('is-invalid');
            isValid = false;
        }

        // Validar data de nascimento
        const birthdate = document.getElementById('birthdate');
        if (birthdate.value && !isValidDate(birthdate.value)) {
            birthdate.classList.add('is-invalid');
            isValid = false;
        }

        // Validar senhas
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password.value.length < 6) {
            password.classList.add('is-invalid');
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('is-invalid');
            isValid = false;
        }

        // Validar descrição
        const description = document.getElementById('description');
        if (description.value.trim().length < 10) {
            description.classList.add('is-invalid');
            isValid = false;
        }

        // Validar termos
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            terms.classList.add('is-invalid');
            isValid = false;
        }

        form.classList.add('was-validated');
        return isValid;
    }

    // Função para validar CPF
    function isValidCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let digit = 11 - (sum % 11);
        if (digit === 10 || digit === 11) digit = 0;
        if (digit !== parseInt(cpf.charAt(9))) return false;
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        
        digit = 11 - (sum % 11);
        if (digit === 10 || digit === 11) digit = 0;
        
        return digit === parseInt(cpf.charAt(10));
    }

    // Função para validar data
    function isValidDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length !== 3) return false;
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        const date = new Date(year, month - 1, day);
        const today = new Date();
        
        return date.getFullYear() === year &&
               date.getMonth() === month - 1 &&
               date.getDate() === day &&
               date < today;
    }

    // Mostrar notificação
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Dados do cadastro:', data);
            showNotification('Cadastro realizado com sucesso!', 'success');
            
            // Simular redirecionamento após sucesso
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showNotification('Por favor, corrija os erros no formulário.', 'danger');
        }
    });

    // Validação em tempo real para senhas
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        } else if (confirmPassword) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
});
