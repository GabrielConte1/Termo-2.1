                //codigo do projeto
                var podeDigitar = null;
                
                // focar no primeiro input ao carregar a página
                document.querySelectorAll('.letra')[0].focus();
                document.querySelector(".button").style.visibility = "hidden";

                // banco de dados com 100 palavras comuns em português gerado pelo Chat GPT
                var palavras = [
                "amigo", "anexo", "andar", "areia", "aviso", "balao", "banco", "barco", "beijo",
                "berro", "bicho", "bloco", "boato", "bravo", "burro", "cacho", "caixa", "calor", "campo",
                "canto", "carro", "cerco", "chave", "cheio", "cinto", "cisco", "claro", "cobra",
                "corpo", "cravo", "credo", "custo", "dados", "dedos", "dente", "dicas", "doido",
                "drama", "ecoar", "elite", "enfim", "envio", "epico", "etico", "falso", "festa", "ficha",
                "filho", "firme", "folha", "fundo", "gasto", "gente", "gesso", "grito",  "horta",
                "idolo", "ideal", "imune", "indio", "janta", "jogar", "juros", "lance", "lapso",
                "largo", "leite", "lenda", "limpo", "lindo", "louco", "lucro", "lugar", "macho", "manso",
                "massa", "matar", "media", "midia", "moeda", "morro", "multa", "nariz", "nobre", "nivel",
                "noite", "norma", "nuvem", "obvio", "ordem", "otimo", "pacto", "perto", "tenso"
                ];
                
                // sorteio de uma palavra dentro da lista
                var sorteio = Math.floor(Math.random() * palavras.length);
                    var palavra = palavras[sorteio];

                // verifica a letra do input e define o estilo visual
                function verificarLetraDigitada(posicao, input, event) {
                    //impede inserir caracteres que não sejam letras
                    if (!podeDigitar || !/[A-Z]/i.test(input.value)) {
                        event.preventDefault();
                        input.value = '';
                    }

                    // salva o valor em uma variável para utilizar mais vezes
                    var letra = input.value.toLowerCase();

                    if (!letra) {
                        // limpa todos os estados caso o input seja vazio
                        input.classList.remove('exata');
                        input.classList.remove('existe');
                        input.classList.remove('naotem');
                    } else if (palavra[posicao] === letra) {
                        // verifica se a letra é exata
                        input.classList.add('exata');
                    } else if (palavra.includes(letra)) {
                        // verifica se a letra existe
                        input.classList.add('existe');
                    } else {
                        // caso a letra não exista
                        input.classList.add('naotem');
                    }
                }

                // verifica a posição do cursor com tecla pressionada foca no input correto
                function identificarTeclaPressionada(posicao, input, event) {
                    if (event.key === 'ArrowLeft') {
                        // verifica se a tecla do evento é a seta esquerda
                        tentarMoverCursoSetaEsquerda(posicao, event);
                    } else if (event.key === 'ArrowRight') {
                        // verifica se a tecla do evento é a seta direita
                        tentarMoverCursoSetaDireita(posicao, event);
                    } else if (event.key === 'Backspace') {
                        // verifica se a tecla do evento é o Backspace
                        tentaRetornarCursor(posicao, input);
                    } else {
                        tentaAvancarCursor(posicao, input);
                    }
                }

                // verifica se pode e avança para o próximo input
                function tentaAvancarCursor(posicao, input) {
                    // seleciona todos os elementos com a class letra
                    var inputs = document.querySelectorAll('.letra');
                    // verifica se o input possui algum valor
                    if (input.value) {
                        // verifica se existe um input maior para mudar para o próximo
                        if (posicao+1 < inputs.length) {
                            inputs[posicao+1].focus();
                        }
                    }
                }

                // verifica se pode e retorna para o input anterior
                function tentaRetornarCursor(posicao, input) {
                    // seleciona todos os elementos com a class letra
                    var inputs = document.querySelectorAll('.letra');
                    // verifica se pode retornar o cursor para o input anterior
                    if (!input.value && posicao) {
                        inputs[posicao-1].focus();
                    }
                }

                // verifica se pode e move o cursor para direta
                function tentarMoverCursoSetaDireita(posicao, event) {
                    // cancela o evento de pressionar tecla
                    event.preventDefault();
                    // seleciona todos os elementos com a class letra
                    var inputs = document.querySelectorAll('.letra');
                    // verifica se existe um input maior para mudar para o próximo
                    if (posicao+1 < inputs.length) {
                        inputs[posicao+1].focus();
                    }
                }

                // verifica se pode e move o cursor para esquerda
                function tentarMoverCursoSetaEsquerda(posicao, event) {
                    // cancela o evento de pressionar tecla
                    event.preventDefault();
                    // seleciona todos os elementos com a class letra
                    var inputs = document.querySelectorAll('.letra');
                    // verifica se pode retornar o cursor para o input anterior
                    if (posicao) {
                        inputs[posicao-1].focus();
                    }
                }

                // regra do cronmetro
                function cronometro (tempo) {
                    var inicio = Date.now();
                    var mostrador = document.getElementById('cronometro');
                    
                    (function regressivo () {
                        var agora =  Date.now();
                        var utilizado = tempo + inicio - agora;
                        mostrador.innerHTML = (utilizado > 0 ? utilizado : 0);
                        setTimeout(function() {
                            if (utilizado > 0) {
                                regressivo();
                                podeDigitar = true;
                            } else {
                                podeDigitar = false;
                                alert("A palavra era "+ palavra)
                                document.querySelector(".button").style.visibility = "visible";
                            }
                        })
                    })();
                }
                document.querySelector(".button").addEventListener("click", 
                function() { location.reload();}); 

                    cronometro(50000);
