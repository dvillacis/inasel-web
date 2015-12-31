"""Modemat API implemented using Google Cloud Endpoints.

Defined here are the ProtoRPC messages needed to define Schemas for methods
as well as those methods defined in an API.
"""


import endpoints
import datetime

from google.appengine.ext import ndb
from google.appengine.api import mail
from protorpc import messages
from protorpc import message_types
from protorpc import remote

package = 'InaselBackend'

class Producto(ndb.Model):
    """Aqui se almacenan los reportes generados"""
    idProducto = ndb.StringProperty(indexed=True)
    titulo = ndb.StringProperty()
    autor = ndb.StringProperty()
    descripcion_corta = ndb.TextProperty()
    descripcion_larga = ndb.TextProperty()
    img_path = ndb.StringProperty()
    categoria = ndb.StringProperty()
    fecha_publicacion = ndb.DateTimeProperty()

class ProductoResponse(messages.Message):
    idProducto = messages.StringField(1)
    titulo = messages.StringField(2)
    autor = messages.StringField(3)
    descripcion_corta = messages.StringField(4)
    descripcion_larga = messages.StringField(5)
    img_path = messages.StringField(6)
    categoria = messages.StringField(7)
    fecha_publicacion = messages.StringField(8)

class ProductoCollectionResponse(messages.Message):
    items = messages.MessageField(ProductoResponse, 1, repeated=True)

class Proyecto(ndb.Model):
    """Este es el modelo de los proyectos"""
    idProyecto = ndb.StringProperty(indexed=True)
    titulo = ndb.StringProperty()
    img_path = ndb.StringProperty()
    autor = ndb.StringProperty()
    financiamiento = ndb.StringProperty()
    estado = ndb.StringProperty()
    colaboracion = ndb.StringProperty()
    descripcion_corta = ndb.StringProperty()
    descripcion_larga = ndb.TextProperty()
    categoria = ndb.StringProperty()
    fecha = ndb.DateTimeProperty()

class ProyectoResponse(messages.Message):
    idProyecto = messages.StringField(1)
    titulo = messages.StringField(2)
    img_path = messages.StringField(3)
    autor = messages.StringField(4)
    financiamiento = messages.StringField(5)
    estado = messages.StringField(6)
    colaboracion = messages.StringField(7)
    descripcion_corta = messages.StringField(8)
    descripcion_larga = messages.StringField(9)
    categoria = messages.StringField(10)
    fecha = messages.StringField(11)

class ProyectoCollectionResponse(messages.Message):
    items = messages.MessageField(ProyectoResponse, 1, repeated=True)

class Noticia(ndb.Model):
    """Este es el modelo de los proyectos"""
    titulo = ndb.StringProperty()
    img_path = ndb.StringProperty()
    contenido = ndb.StringProperty()
    enlace = ndb.StringProperty()
    fecha = ndb.DateTimeProperty(auto_now_add=True)

class NoticiaResponse(messages.Message):
    titulo = messages.StringField(1)
    img_path = messages.StringField(2)
    contenido = messages.StringField(3)
    enlace = messages.StringField(4)
    fecha = messages.StringField(5)

class NoticiaCollectionResponse(messages.Message):
    items = messages.MessageField(NoticiaResponse, 1, repeated=True)

class Suscriptor(ndb.Model):
    """Este es el modelo de los proyectos"""
    nombre = ndb.StringProperty()
    email = ndb.StringProperty()

class SuscriptorResponse(messages.Message):
    nombre = messages.StringField(1)
    email = messages.StringField(2)

class SuscriptorCollectionResponse(messages.Message):
    items = messages.MessageField(NoticiaResponse, 1, repeated=True)

class MensajeResponse(messages.Message):
    resultado = messages.StringField(1)


@endpoints.api(name='inaselBackend', version='v2')
class InaselBackend(remote.Service):
    """inaselbackend v2."""

    #listar todos los productos
    PRODUCTO_REQUEST_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        count=messages.IntegerField(2,variant=messages.Variant.INT32),
        id=messages.StringField(3,variant=messages.Variant.STRING))

    @endpoints.method(PRODUCTO_REQUEST_RESOURCE, ProductoCollectionResponse,
        path='listarProductos', http_method='GET', name='inaselbackend.listarProductos')
    def inaselbackend_listarProductos(self,request):
        mcr = ProductoCollectionResponse()
        if request.id == None:
            qry = Producto.query().order(-Producto.fecha_publicacion).fetch(request.count)
        else:
            qry = Producto.query(Producto.idProducto==request.id).order(-Producto.fecha_publicacion).fetch(request.count)
        for q in qry:
            fecha = q.fecha_publicacion.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = ProductoResponse(idProducto=q.idProducto,titulo=q.titulo,autor=q.autor,descripcion_corta=q.descripcion_corta,
                descripcion_larga=q.descripcion_larga,img_path=q.img_path, categoria=q.categoria,fecha_publicacion=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    # Defino el recurso producto
    PRODUCTO_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        idProducto=messages.StringField(2,variant=messages.Variant.STRING),
        titulo=messages.StringField(3,variant=messages.Variant.STRING),
        autor=messages.StringField(4,variant=messages.Variant.STRING),
        descripcion_corta=messages.StringField(5,variant=messages.Variant.STRING),
        descripcion_larga=messages.StringField(6,variant=messages.Variant.STRING),
        img_path=messages.StringField(7,variant=messages.Variant.STRING),
        categoria=messages.StringField(8,variant=messages.Variant.STRING),
        fecha_publicacion=messages.StringField(9,variant=messages.Variant.STRING))
 
    #guardar un producto
    @endpoints.method(PRODUCTO_RESOURCE, ProductoCollectionResponse,
        path='guardarProducto', http_method='POST', name='inaselbackend.guardarProducto')
    def inaselbackend_guardarProducto(self,request):
        fecha = datetime.datetime.strptime(request.fecha_publicacion, '%d %b %Y')
        msg = Producto(idProducto=request.idProducto,titulo=request.titulo,autor=request.autor,descripcion_corta=request.descripcion_corta,
            descripcion_larga=request.descripcion_larga,img_path=request.img_path, categoria=request.categoria,fecha_publicacion=fecha)
        msg.put()
        mcr = ProductoCollectionResponse()
        mcr.items.append(ProductoResponse(idProducto=request.idProducto,titulo=request.titulo,autor=request.autor,descripcion_corta=request.descripcion_corta,
            descripcion_larga=request.descripcion_larga,img_path=request.img_path,categoria=request.categoria,fecha_publicacion=request.fecha_publicacion))
        qry = Producto.query()
        for q in qry:
            fecha = q.fecha_publicacion.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = ProductoResponse(idProducto=q.idProducto,titulo=q.titulo,autor=q.autor,descripcion_corta=q.descripcion_corta,
                descripcion_larga=q.descripcion_larga,img_path=q.img_path,categoria=q.categoria,fecha_publicacion=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    #listar todos los proyectos
    PROYECTO_REQUEST_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        count=messages.IntegerField(2,variant=messages.Variant.INT32),
        id=messages.StringField(3,variant=messages.Variant.STRING))

    @endpoints.method(PROYECTO_REQUEST_RESOURCE, ProyectoCollectionResponse,
        path='listarProyectos', http_method='GET', name='inaselbackend.listarProyectos')
    def inaselbackend_listarProyectos(self,request):
        mcr = ProyectoCollectionResponse()
        if request.id == None:
            qry = Proyecto.query().order(-Proyecto.fecha).fetch(request.count)
        else:
            qry = Proyecto.query(Proyecto.idProyecto == request.id).order(-Proyecto.fecha).fetch(request.count)
        for q in qry:
            fecha = q.fecha.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = ProyectoResponse(idProyecto=q.idProyecto,
                titulo=q.titulo,img_path=q.img_path,autor=q.autor,financiamiento=q.financiamiento,
                estado=q.estado,colaboracion=q.colaboracion,descripcion_corta=q.descripcion_corta,
                descripcion_larga=q.descripcion_larga,categoria=q.categoria,fecha=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    # Defino el recurso proyecto
    PROYECTO_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        idProyecto=messages.StringField(2,variant=messages.Variant.STRING),
        titulo=messages.StringField(3,variant=messages.Variant.STRING),
        img_path=messages.StringField(4,variant=messages.Variant.STRING),
        autor=messages.StringField(5,variant=messages.Variant.STRING),
        financiamiento=messages.StringField(6,variant=messages.Variant.STRING),
        estado=messages.StringField(7,variant=messages.Variant.STRING),
        colaboracion=messages.StringField(8,variant=messages.Variant.STRING),
        descripcion_corta=messages.StringField(9,variant=messages.Variant.STRING),
        descripcion_larga=messages.StringField(10,variant=messages.Variant.STRING),
        categoria=messages.StringField(11,variant=messages.Variant.STRING),
        fecha=messages.StringField(12,variant=messages.Variant.STRING))
 
    #guardar un proyecto
    @endpoints.method(PROYECTO_RESOURCE, ProyectoCollectionResponse,
        path='guardarProyecto', http_method='POST', name='inaselbackend.guardarProyecto')
    def inaselbackend_guardarProyecto(self,request):
        fecha = datetime.datetime.strptime(request.fecha, '%d %b %Y')
        msg = Proyecto(idProyecto=request.idProyecto,titulo=request.titulo,
            img_path=request.img_path,autor=request.autor,financiamiento=request.financiamiento,
            estado=request.estado,colaboracion=request.colaboracion, descripcion_corta=request.descripcion_corta,
            descripcion_larga=request.descripcion_larga,categoria=request.categoria,fecha=fecha)
        msg.put()
        mcr = ProyectoCollectionResponse()
        mcr.items.append(ProyectoResponse(idProyecto=request.idProyecto,titulo=request.titulo,
            img_path=request.img_path,autor=request.autor,financiamiento=request.financiamiento,
            estado=request.estado,colaboracion=request.colaboracion, descripcion_corta=request.descripcion_corta,
            descripcion_larga=request.descripcion_larga,categoria=request.categoria,fecha=request.fecha))
        qry = Proyecto.query()
        for q in qry:
            fecha = q.fecha.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = ProyectoResponse(idProyecto=q.idProyecto,titulo=q.titulo,
                img_path=q.img_path,autor=q.autor,financiamiento=q.financiamiento,
                estado=q.estado,colaboracion=q.colaboracion, descripcion_corta=q.descripcion_corta,
                descripcion_larga=q.descripcion_larga,categoria=q.categoria,fecha=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    #listar todas las noticias
    NOTICIA_REQUEST_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        count=messages.IntegerField(2,variant=messages.Variant.INT32))
    @endpoints.method(NOTICIA_REQUEST_RESOURCE, NoticiaCollectionResponse,
        path='listarNoticias', http_method='GET', name='inaselbackend.listarNoticias')
    def inaselbackend_listarNoticias(self,request):
        mcr = NoticiaCollectionResponse()
        qry = Noticia.query().order(-Noticia.fecha).fetch(request.count)
        for q in qry:
            print q
            fecha = q.fecha.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = NoticiaResponse(titulo=q.titulo,img_path=q.img_path,contenido=q.contenido,enlace=q.enlace,fecha=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    # Defino el recurso noticia
    NOTICIA_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        titulo=messages.StringField(2,variant=messages.Variant.STRING),
        img_path=messages.StringField(3,variant=messages.Variant.STRING),
        contenido=messages.StringField(4,variant=messages.Variant.STRING),
        enlace=messages.StringField(5,variant=messages.Variant.STRING))
 
    #guardar una noticia
    @endpoints.method(NOTICIA_RESOURCE, NoticiaCollectionResponse,
        path='guardarNoticia', http_method='POST', name='inaselbackend.guardarNoticia')
    def inaselbackend_guardarNoticia(self,request):
        fecha = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        msg = Noticia(titulo=request.titulo,img_path=request.img_path,contenido=request.contenido,enlace=request.enlace)
        msg.put()
        fecha = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        mcr = NoticiaCollectionResponse()
        mcr.items.append(NoticiaResponse(titulo=request.titulo,img_path=request.img_path,contenido=request.contenido,enlace=request.enlace,fecha=fecha))
        qry = Noticia.query()
        for q in qry:
            fecha = q.fecha.strftime("%Y-%m-%d %H:%M:%S")
            mensajeRecibido = NoticiaResponse(titulo=q.titulo,img_path=q.img_path,contenido=q.contenido,enlace=q.enlace,fecha=fecha)
            mcr.items.append(mensajeRecibido)
        return mcr

    #enviar email de contacto
    CONTACT_REQUEST_RESOURCE = endpoints.ResourceContainer(
        message_types.VoidMessage,
        titulo=messages.StringField(2,variant=messages.Variant.STRING),
        nombre=messages.StringField(3,variant=messages.Variant.STRING),
        email=messages.StringField(4,variant=messages.Variant.STRING),
        telefono=messages.StringField(5,variant=messages.Variant.STRING),
        mensaje=messages.StringField(6,variant=messages.Variant.STRING))
    @endpoints.method(CONTACT_REQUEST_RESOURCE, MensajeResponse,
        path='enviarMensaje', http_method='POST', name='inaselbackend.enviarMensaje')
    def inaselbackend_enviarMensaje(self,request):
        fecha = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if not mail.is_email_valid(request.email):
            response = MensajeResponse(resultado='Envio Incorrecto')
            
        else:
            response = MensajeResponse(resultado='Envio Correcto')

        return response
        
        

APPLICATION = endpoints.api_server([InaselBackend])
