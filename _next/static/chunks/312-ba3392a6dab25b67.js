"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [312], {
        6242: function (e, t, i) {
            i.d(t, {
                default: function () {
                    return R
                }
            });
            var s = i(7437),
                a = i(7138),
                r = ["x", "y", "z"],
                o = function (e) {
                    Object.assign(this, {
                        uniforms: {},
                        geometry: {
                            vertices: [{
                                x: 0,
                                y: 0,
                                z: 0
                            }]
                        },
                        mode: 0,
                        modifiers: {},
                        attributes: [],
                        multiplier: 1,
                        buffers: []
                    }), Object.assign(this, e), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes()
                };
            o.prototype.compileShader = function (e, t) {
                var i = this.gl.createShader(e);
                return this.gl.shaderSource(i, t), this.gl.compileShader(i), i
            }, o.prototype.prepareProgram = function () {
                var e = this.gl,
                    t = this.vertex,
                    i = this.fragment,
                    s = e.createProgram();
                e.attachShader(s, this.compileShader(35633, t)), e.attachShader(s, this.compileShader(35632, i)), e.linkProgram(s), e.useProgram(s), this.program = s
            }, o.prototype.prepareUniforms = function () {
                for (var e = Object.keys(this.uniforms), t = 0; t < e.length; t += 1) {
                    var i = this.gl.getUniformLocation(this.program, e[t]);
                    this.uniforms[e[t]].location = i
                }
            }, o.prototype.prepareAttributes = function () {
                void 0 !== this.geometry.vertices && this.attributes.push({
                    name: "aPosition",
                    size: 3
                }), void 0 !== this.geometry.normal && this.attributes.push({
                    name: "aNormal",
                    size: 3
                }), this.attributeKeys = [];
                for (var e = 0; e < this.attributes.length; e += 1) this.attributeKeys.push(this.attributes[e].name), this.prepareAttribute(this.attributes[e])
            }, o.prototype.prepareAttribute = function (e) {
                for (var t = this.geometry, i = this.multiplier, s = t.vertices, a = t.normal, o = new Float32Array(i * s.length * e.size), n = 0; n < i; n += 1)
                    for (var l = e.data && e.data(n, i), d = n * s.length * e.size, c = 0; c < s.length; c += 1)
                        for (var x = 0; x < e.size; x += 1) {
                            var m = this.modifiers[e.name];
                            o[d] = void 0 !== m ? m(l, c, x, this) : "aPosition" === e.name ? s[c][r[x]] : "aNormal" === e.name ? a[c][r[x]] : l[x], d += 1
                        }
                this.attributes[this.attributeKeys.indexOf(e.name)].data = o, this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(e.name)])
            }, o.prototype.prepareBuffer = function (e) {
                var t = e.data,
                    i = e.name,
                    s = e.size,
                    a = this.gl.createBuffer();
                this.gl.bindBuffer(34962, a), this.gl.bufferData(34962, t, 35044);
                var r = this.gl.getAttribLocation(this.program, i);
                this.gl.enableVertexAttribArray(r), this.gl.vertexAttribPointer(r, s, 5126, !1, 0, 0), this.buffers[this.attributeKeys.indexOf(e.name)] = {
                    buffer: a,
                    location: r,
                    size: s
                }
            }, o.prototype.render = function (e) {
                var t = this,
                    i = this.uniforms,
                    s = this.multiplier,
                    a = this.gl;
                a.useProgram(this.program);
                for (var r = 0; r < this.buffers.length; r += 1) {
                    var o = this.buffers[r],
                        n = o.location,
                        l = o.buffer,
                        d = o.size;
                    a.enableVertexAttribArray(n), a.bindBuffer(34962, l), a.vertexAttribPointer(n, d, 5126, !1, 0, 0)
                }
                Object.keys(e).forEach(function (t) {
                    i[t].value = e[t].value
                }), Object.keys(i).forEach(function (e) {
                    var s = i[e];
                    t.uniformMap[s.type](s.location, s.value)
                }), a.drawArrays(this.mode, 0, s * this.geometry.vertices.length), this.onRender && this.onRender(this)
            }, o.prototype.destroy = function () {
                for (var e = 0; e < this.buffers.length; e += 1) this.gl.deleteBuffer(this.buffers[e].buffer);
                this.gl.deleteProgram(this.program), this.gl = null
            };
            var n = function (e) {
                var t = this,
                    i = e || {},
                    s = i.canvas;
                void 0 === s && (s = document.querySelector("canvas"));
                var a = i.context;
                void 0 === a && (a = {});
                var r = i.contextType;
                void 0 === r && (r = "experimental-webgl");
                var o = i.settings;
                void 0 === o && (o = {});
                var n = s.getContext(r, Object.assign({
                    alpha: !1,
                    antialias: !1
                }, a));
                Object.assign(this, {
                    gl: n,
                    canvas: s,
                    uniforms: {},
                    instances: new Map,
                    shouldRender: !0
                }), Object.assign(this, {
                    devicePixelRatio: 1,
                    clearColor: [1, 1, 1, 1],
                    position: {
                        x: 0,
                        y: 0,
                        z: 2
                    },
                    clip: [.001, 100]
                }), Object.assign(this, o), this.uniformMap = {
                    float: function (e, t) {
                        return n.uniform1f(e, t)
                    },
                    vec2: function (e, t) {
                        return n.uniform2fv(e, t)
                    },
                    vec3: function (e, t) {
                        return n.uniform3fv(e, t)
                    },
                    vec4: function (e, t) {
                        return n.uniform4fv(e, t)
                    },
                    mat2: function (e, t) {
                        return n.uniformMatrix2fv(e, !1, t)
                    },
                    mat3: function (e, t) {
                        return n.uniformMatrix3fv(e, !1, t)
                    },
                    mat4: function (e, t) {
                        return n.uniformMatrix4fv(e, !1, t)
                    }
                }, n.enable(n.DEPTH_TEST), n.depthFunc(n.LEQUAL), !1 === n.getContextAttributes().alpha && (n.clearColor.apply(n, this.clearColor), n.clearDepth(1)), this.onSetup && this.onSetup(n), window.addEventListener("resize", function () {
                    return t.resize()
                }), this.resize(), this.render()
            };
            n.prototype.resize = function () {
                var e = this.gl,
                    t = this.canvas,
                    i = this.devicePixelRatio,
                    s = this.position;
                t.width = t.clientWidth * i, t.height = t.clientHeight * i;
                var a = e.drawingBufferWidth,
                    r = e.drawingBufferHeight,
                    o = a / r;
                e.viewport(0, 0, a, r);
                var n = Math.tan(Math.PI / 180 * 22.5),
                    l = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, s.x, s.y, -((o < 1 ? 1 : o) * s.z), 1];
                this.uniforms.uProjectionMatrix = {
                    type: "mat4",
                    value: [.5 / n, 0, 0, 0, 0, o / n * .5, 0, 0, 0, 0, -(this.clip[1] + this.clip[0]) / (this.clip[1] - this.clip[0]), -1, 0, 0, -2 * this.clip[1] * (this.clip[0] / (this.clip[1] - this.clip[0])), 0]
                }, this.uniforms.uViewMatrix = {
                    type: "mat4",
                    value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                }, this.uniforms.uModelMatrix = {
                    type: "mat4",
                    value: l
                }
            }, n.prototype.toggle = function (e) {
                e !== this.shouldRender && (this.shouldRender = void 0 !== e ? e : !this.shouldRender, this.shouldRender && this.render())
            }, n.prototype.render = function () {
                var e = this;
                this.gl.clear(16640), this.instances.forEach(function (t) {
                    t.render(e.uniforms)
                }), this.onRender && this.onRender(this), this.shouldRender && requestAnimationFrame(function () {
                    return e.render()
                })
            }, n.prototype.add = function (e, t) {
                void 0 === t && (t = {
                    uniforms: {}
                }), void 0 === t.uniforms && (t.uniforms = {}), Object.assign(t.uniforms, JSON.parse(JSON.stringify(this.uniforms))), Object.assign(t, {
                    gl: this.gl,
                    uniformMap: this.uniformMap
                });
                var i = new o(t);
                return this.instances.set(e, i), i
            }, n.prototype.remove = function (e) {
                var t = this.instances.get(e);
                void 0 !== t && (t.destroy(), this.instances.delete(e))
            }, n.prototype.destroy = function () {
                var e = this;
                this.instances.forEach(function (t, i) {
                    t.destroy(), e.instances.delete(i)
                }), this.toggle(!1)
            };
            var l = "theta",
                d = "mapSamples",
                c = "mapBrightness",
                x = "baseColor",
                m = "markerColor",
                h = "glowColor",
                u = "markers",
                f = "diffuse",
                p = "devicePixelRatio",
                v = "dark",
                b = "offset",
                g = "scale",
                w = "opacity",
                j = "mapBaseBrightness",
                y = {
                    phi: "A",
                    [l]: "B",
                    [d]: "l",
                    [c]: "E",
                    [x]: "R",
                    [m]: "S",
                    [h]: "y",
                    [f]: "F",
                    [v]: "G",
                    [b]: "x",
                    [g]: "C",
                    [w]: "H",
                    [j]: "I"
                },
                {
                    PI: A,
                    sin: N,
                    cos: B
                } = Math,
                k = e => [].concat(...e.map(e => {
                    let [t, i] = e.location;
                    t = t * A / 180, i = i * A / 180 - A;
                    let s = B(t);
                    return [-s * B(i), N(t), s * N(i), e.size]
                }), [0, 0, 0, 0]),
                z = (e, t) => {
                    let i = (e, i, s) => ({
                            type: e,
                            value: void 0 === t[i] ? s : t[i]
                        }),
                        s = e.getContext("webgl") ? "webgl" : "experimental-webgl",
                        a = new n({
                            canvas: e,
                            contextType: s,
                            context: {
                                alpha: !0,
                                stencil: !1,
                                antialias: !0,
                                depth: !1,
                                preserveDrawingBuffer: !1,
                                ...t.context
                            },
                            settings: {
                                [p]: t[p] || 1,
                                onSetup: e => {
                                    let t = e.RGB,
                                        i = e.UNSIGNED_BYTE,
                                        s = e.TEXTURE_2D,
                                        a = e.createTexture();
                                    e.bindTexture(s, a), e.texImage2D(s, 0, t, 1, 1, 0, t, i, new Uint8Array([0, 0, 0, 0]));
                                    let r = new Image;
                                    r.onload = () => {
                                        e.bindTexture(s, a), e.texImage2D(s, 0, t, t, i, r), e.generateMipmap(s);
                                        let o = e.getParameter(e.CURRENT_PROGRAM),
                                            n = e.getUniformLocation(o, "J");
                                        e.texParameteri(s, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(s, e.TEXTURE_MAG_FILTER, e.NEAREST), e.uniform1i(n, 0)
                                    }, r.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg=="
                                }
                            }
                        });
                    return a.add("", {
                        vertex: "attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}",
                        fragment: "precision highp float;uniform vec2 t,x;uniform vec3 R,S,y;uniform vec4 z[64];uniform float A,B,l,C,D,E,F,G,H,I;uniform sampler2D J;float K=1./l;mat3 L(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 w(vec3 c,out float v){c=c.xzy;float p=max(2.,floor(log2(2.236068*l*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1.,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*l+1.),-e.x*f.x+d.x*(f.y*l+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 s=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+s);if(j>l)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float k=fract(b)*6.283185,i=1.-2.*j*K,m=sqrt(1.-i*i);vec3 o=vec3(cos(k)*m,sin(k)*m,i);float u=length(c-o);if(u<n)n=u,r=o;}v=n;return r.xzy;}void main(){vec2 b=(gl_FragCoord.xy/t*2.-1.)/C-x*vec2(1.,-1.)/t;b.x*=t.x/t.y;float c=dot(b,b);vec4 M=vec4(0.);float m=0.;if(c<=.64){for(int d=0;d<2;d++){vec4 e=vec4(0.);float a;vec3 u=vec3(0.,0.,1.),f=normalize(vec3(b,sqrt(.64-c)));f.z*=d>0?-1.:1.,u.z*=d>0?-1.:1.;vec3 g=f*L(B,A),h=w(g,a);float n=asin(h.y),i=acos(-h.x/cos(n));i=h.z<0.?-i:i;float N=max(texture2D(J,vec2(i*.5/3.141593,-(n/3.141593+.5))).x,I),O=smoothstep(8e-3,0.,a),j=dot(f,u),v=pow(j,F)*E,o=N*O*v,T=mix((1.-o)*pow(j,.4),o,G)+.1;e+=vec4(R*T,1.);int U=int(D);float p=0.;for(int k=0;k<64;k++){if(k>=U)break;vec4 q=z[k];vec3 r=q.xyz,P=r-g;float s=q.w;if(dot(P,P)>s*s*4.)continue;vec3 V=w(r,a);a=length(V-g),a<s?p+=smoothstep(s*.5,0.,a):0.;}p=min(1.,p*v),e.xyz=mix(e.xyz,S,p),e.xyz+=pow(1.-j,4.)*y,M+=e*(1.+(d>0?-H:H))/2.;}m=pow(dot(normalize(vec3(-b,sqrt(1.-c))),vec3(0.,0.,1.)),4.)*smoothstep(0.,1.,.2/(c-.64));}else{float Q=sqrt(.2/(c-.64));m=smoothstep(.5,1.,Q/(Q+1.));}gl_FragColor=M+vec4(m*y,m);}",
                        uniforms: {
                            t: {
                                type: "vec2",
                                value: [t.width, t.height]
                            },
                            A: i("float", "phi"),
                            B: i("float", l),
                            l: i("float", d),
                            E: i("float", c),
                            I: i("float", j),
                            R: i("vec3", x),
                            S: i("vec3", m),
                            F: i("float", f),
                            y: i("vec3", h),
                            G: i("float", v),
                            z: {
                                type: "vec4",
                                value: k(t[u])
                            },
                            D: {
                                type: "float",
                                value: t[u].length
                            },
                            x: i("vec2", b, [0, 0]),
                            C: i("float", g, 1),
                            H: i("float", w, 1)
                        },
                        mode: 4,
                        geometry: {
                            vertices: [{
                                x: -100,
                                y: 100,
                                z: 0
                            }, {
                                x: -100,
                                y: -100,
                                z: 0
                            }, {
                                x: 100,
                                y: 100,
                                z: 0
                            }, {
                                x: 100,
                                y: -100,
                                z: 0
                            }, {
                                x: -100,
                                y: -100,
                                z: 0
                            }, {
                                x: 100,
                                y: 100,
                                z: 0
                            }]
                        },
                        onRender: ({
                            uniforms: e
                        }) => {
                            let i = {};
                            if (t.onRender) {
                                for (let s in i = t.onRender(i) || i, y) void 0 !== i[s] && (e[y[s]].value = i[s]);
                                void 0 !== i[u] && (e.z.value = k(i[u]), e.D.value = i[u].length), i.width && i.height && (e.t.value = [i.width, i.height])
                            }
                        }
                    }), a
                },
                E = i(2265),
                C = i(8882);

            function R() {
                let e = (0, E.useRef)(),
                    t = (0, C.wW)();
                return (0, E.useEffect)(() => {
                    let t = 0,
                        i = z(e.current, {
                            baseColor: [.3, .3, .3],
                            dark: 1,
                            devicePixelRatio: devicePixelRatio,
                            diffuse: 1.2,
                            glowColor: [.5, 1, .5],
                            height: 310 * devicePixelRatio,
                            mapBrightness: 6,
                            mapSamples: 16e3,
                            markerColor: [0, 1, .13],
                            phi: 0,
                            scale: 1.2,
                            theta: 0,
                            width: 310 * devicePixelRatio,
                            markers: [{
                                location: [25.2744, 133.7751],
                                size: .05
                            }, {
                                location: [50.5039, 4.4699],
                                size: .05
                            }, {
                                location: [-14.235, -51.9253],
                                size: .05
                            }, {
                                location: [56.1304, -106.3468],
                                size: .05
                            }, {
                                location: [46.8182, 8.2275],
                                size: .05
                            }, {
                                location: [51.1657, 10.4515],
                                size: .05
                            }, {
                                location: [56.2639, 9.5018],
                                size: .05
                            }, {
                                location: [18.7357, 70.1627],
                                size: .05
                            }, {
                                location: [40.4637, -3.7492],
                                size: .05
                            }, {
                                location: [61.9241, 25.7482],
                                size: .05
                            }, {
                                location: [46.2276, 2.2137],
                                size: .05
                            }, {
                                location: [55.3781, -3.436],
                                size: .05
                            }, {
                                location: [47.1625, 19.5033],
                                size: .05
                            }, {
                                location: [-.7893, 113.9213],
                                size: .05
                            }, {
                                location: [20.5937, 78.9629],
                                size: .05
                            }, {
                                location: [41.8719, 12.5674],
                                size: .05
                            }, {
                                location: [36.2048, 138.2529],
                                size: .05
                            }, {
                                location: [-.0236, 37.9062],
                                size: .05
                            }, {
                                location: [35.9078, 127.7669],
                                size: .05
                            }, {
                                location: [56.8796, 24.6032],
                                size: .05
                            }, {
                                location: [31.7917, -7.0926],
                                size: .05
                            }, {
                                location: [23.6345, -102.5528],
                                size: .05
                            }, {
                                location: [4.2105, 101.9758],
                                size: .05
                            }, {
                                location: [52.1326, 5.2913],
                                size: .05
                            }, {
                                location: [28.3949, 84.124],
                                size: .05
                            }, {
                                location: [8.538, -80.7821],
                                size: .05
                            }, {
                                location: [30.3753, 69.3451],
                                size: .05
                            }, {
                                location: [51.9194, 19.1451],
                                size: .05
                            }, {
                                location: [44.0165, 21.0059],
                                size: .05
                            }, {
                                location: [23.8859, 45.0792],
                                size: .05
                            }, {
                                location: [60.1282, 18.6435],
                                size: .05
                            }, {
                                location: [48.3794, 31.1656],
                                size: .05
                            }, {
                                location: [37.0902, -95.7129],
                                size: .05
                            }, {
                                location: [14.0583, 108.2772],
                                size: .05
                            }],
                            onRender: e => {
                                e.phi = t, t += .01
                            }
                        });
                    return () => {
                        i.destroy()
                    }
                }, []), (0, s.jsx)("section", {
                    id: "callToAction",
                    className: "aBGGrad border-t border-borA bg-backB bg-cover bg-center bg-no-repeat",
                    children: (0, s.jsx)("div", {
                        className: "aBGGrid bg-center py-20 md:py-32",
                        children: (0, s.jsx)("div", {
                            className: "mx-auto max-w-7xl px-6 md:px-12",
                            children: (0, s.jsxs)("div", {
                                className: "cBGGrad flex gap-x-5 rounded-3xlA bg-backD p-[30px] md:p-12 lg:gap-x-20 lg:px-16 lg:py-8",
                                children: [(0, s.jsxs)("div", {
                                    className: "flex flex-col justify-center lg:col-span-6",
                                    children: [(0, s.jsx)("h2", {
                                        className: "text-2xlA font-semibold text-textD md:text-3xl lg:text-4xl",
                                        children: "Build beautiful websites faster"
                                    }), (0, s.jsxs)("p", {
                                        className: "mt-4 text-base font-normal text-textD md:text-lg",
                                        children: [(0, s.jsxs)("span", {
                                            className: "max-xl:hidden",
                                            children: ["SuperDev Pro has been extensively used while building this website, so if you love this website, you will love SuperDev Pro too.", " "]
                                        }), "Join web developers and designers from 30+ countries who have already said goodbye to tedious debugging with Inspect Element."]
                                    }), (0, s.jsx)("div", {
                                        className: "mt-6 flex items-center gap-x-6",
                                        children: (0, s.jsx)("div", {
                                            className: "bBGGrad inline-flex rounded-xl p-[2px]",
                                            children: (0, s.jsxs)(a.default, {
                                                className: "rounded-lgA bg-btnA px-6 py-[10px] text-base font-medium text-textA",
                                                href: "/#pricing",
                                                onClick: () => {
                                                    t("Get Pro Now - CTA")
                                                },
                                                children: [(0, s.jsx)("i", {
                                                    className: "fa-solid fa-wand-magic-sparkles mr-2 text-base text-textA"
                                                }), "Get Pro Now"]
                                            })
                                        })
                                    })]
                                }), (0, s.jsx)("div", {
                                    className: "flex items-center max-lg:hidden lg:col-span-6",
                                    children: (0, s.jsx)("canvas", {
                                        ref: e,
                                        style: {
                                            width: 310,
                                            height: 310
                                        }
                                    })
                                })]
                            })
                        })
                    })
                })
            }
        },
        1360: function (e, t, i) {
            i.d(t, {
                default: function () {
                    return o
                }
            });
            var s = i(7437),
                a = i(6648),
                r = i(1827);

            function o() {
                return (0, s.jsx)("section", {
                    id: "reviews",
                    className: "border-t border-borA bg-backB py-20 md:py-32",
                    children: (0, s.jsxs)("div", {
                        className: "mx-auto max-w-7xl px-6 md:px-12",
                        children: [(0, s.jsxs)("div", {
                            className: "mx-auto max-w-xl text-center",
                            children: [(0, s.jsx)("h2", {
                                className: "aTextGrad text-2xlA font-semibold md:text-3xl lg:text-4xl",
                                children: "Used by Thousands"
                            }), (0, s.jsx)("p", {
                                className: "mt-4 text-base font-normal text-textB md:text-lg",
                                children: "SuperDev Pro is used by 3000+ awesome folks around the world to deliver world-class websites. See what they have to say."
                            })]
                        }), (0, s.jsxs)("div", {
                            className: "mt-14 grid grid-cols-1 items-start gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-3",
                            children: [(0, s.jsxs)("div", {
                                className: "grid gap-8",
                                children: [(0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Excellent addition to toolkit"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "The user experience is intuitive and easy to navigate. An excellent addition to my toolkit."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Fahad Ahmad"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Developer - Accenture"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Fahad Ahmad",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/fahad.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Makes job much easier"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "That’s great! It will make every designer and developer’s job so much easier \uD83D\uDCAA."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Laurentiu Stefan"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Growth Marketer"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Stefan Laurentiu",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/stefan.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Awesome Plugin"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "This plugin is awesome and really easy to use."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Mohammad Omar"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Design Lead - Gurucool"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Mohammad Omar",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/omar.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Quite handy tool"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Quite handy tool! Picking colors and Text Edit are my favorites :)"
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Ramiro Guerrero"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Stories - QuillSt"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Ramiro Guerrero",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/ramiro.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Going to love this"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Developers and designers are going to love this!"
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Shushant Lakhyani"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - Digital Disruptor"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Shushant Lakhyani",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/shushant.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Can replace multiple tools"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Wow, this looks cool, it can actually replace multiple tools I use. Thank you!"
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Jose Gutierrez"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Product Manager - Hostt"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Jose Gutierrez",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/jose.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                })]
                            }), (0, s.jsxs)("div", {
                                className: "grid gap-8 max-md:hidden",
                                children: [(0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Extremely useful"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Extremely useful features for me as a designer. Great job!"
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Amir Equbal"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - Basira Studio"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Amir Equbal",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/amir.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Life saver for coders"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "The extension is a life saver and would improve dramatically production times for developers and coders. I use it daily and purchased the PRO for this reason."
                                        })]
                                    }), " ", (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Fabrizio Spanu"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - Digital Fastmind"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Fabrizio Spanu",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/fabrizio.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Super user-friendly"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Wow, this is a super user-friendly widget for designers! Can’t tell you how much UI/UX designers hate using the browser console."
                                        })]
                                    }), " ", (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Biro Florin"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - Goos.ly"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Biro Florin",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/biro.gif",
                                            unoptimized: !0,
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Very useful for nerds"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "I am so excited to use this. It looks great and is very useful for us nerds."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Luke Eischen"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - MagicFortune"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Luke Eischen",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/luke.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Like the way it works"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "A really potent tool for designers and developers, I really like the way it works."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Radu Tudosescu"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Growth - Promocrat"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Radu Tudosescu",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/radu.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Whole toolkit in the browser"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Promising! With all its features, it’s like having a whole toolkit right in your browser."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Johannes Frank"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder | Creator"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Johannes Frank",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/frank.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                })]
                            }), (0, s.jsxs)("div", {
                                className: "grid gap-8 max-lg:hidden",
                                children: [(0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Great extension for developers"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Great extension for frontend developers. Page ruler is an amazing feature."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Ahmad Hassan"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Developer - Polygon"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Ahmad Hassan",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/ahmad.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Awesome addition to toolbelt"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "An awesome addition to a developer or designer’s toolbelt. Whether you are a beginner or an expert, you will definitely get some value from this."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Micah Odell"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Developer - Orr Fellow"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Micah Odell",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/micah.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Very useful extension"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Great work. As a developer, I can really say that this is a very useful extension."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Rishabh Kanojiya"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Developer - Fynd"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Rishabh Kanojiya",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/rishabh.png",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Love this tool"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "Love this tool! As a developer, I must have tried it and it is awesome."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Martin Moravek"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Founder - Minimalist Phone"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Martin Moravek",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/martin.jpeg",
                                            width: "42"
                                        })]
                                    })]
                                }), (0, s.jsxs)(r.E.div, {
                                    className: "borShadow rounded-3xlA border-borB bg-backC p-6 backdrop-blur md:p-[30px]",
                                    initial: {
                                        opacity: 0,
                                        translateY: 96
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        translateY: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        duration: .5
                                    },
                                    children: [(0, s.jsxs)("div", {
                                        children: [(0, s.jsx)("h3", {
                                            className: "text-xl font-semibold text-textA",
                                            children: "Transformed browsing"
                                        }), (0, s.jsx)("p", {
                                            className: "mt-3 text-base font-normal text-textB",
                                            children: "It’s packed with features that make my life much easier and more efficient."
                                        })]
                                    }), (0, s.jsxs)("div", {
                                        className: "mt-6 flex items-center justify-between",
                                        children: [(0, s.jsxs)("div", {
                                            children: [(0, s.jsx)("div", {
                                                className: "text-base font-medium text-textB",
                                                children: "Aryan Khan"
                                            }), (0, s.jsx)("div", {
                                                className: "mt-1 text-sm font-medium text-textB",
                                                children: "Developer - LineupX"
                                            })]
                                        }), (0, s.jsx)(a.default, {
                                            alt: "Review By Aryan Khan",
                                            className: "rounded-full",
                                            height: "0",
                                            src: "/reviews/aryan.png",
                                            width: "42"
                                        })]
                                    })]
                                })]
                            })]
                        })]
                    })
                })
            }
        }
    }
]);