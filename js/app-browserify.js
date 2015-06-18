"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
// es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise,
	$ = require('jquery')

window.addEventListener('load', app)

function app() {

    var Combatant = function(settings) {
    	var self = this;

    	if(settings.node) {
    		this.$node = settings.node
    		this.node = settings.node[0]
    	}

    	this.x=0
    	this.y=0
    	this.velocity=0
    	this.canFall = false
    	this.move_right = false
    	this.move_left = false
    	var speed=10
    	var gravity = .5

    	this.setPosition = function(pos) {

    		if(typeof pos.x==='number')
    		this.x = pos.x

    		if(typeof pos.y==='number')
    		this.y = pos.y

    		this.$node.css({
    			left : this.x + 10 + 'px',
    			top : $('.canvas').height() - this.$node.height() + this.y - 10 + 'px'
    		})
    	}

    	this.getPosition = function(){

			return{
				x : this.x,
				y : this.y
			}

    	}
    	this.jump = function(){
    		this.velocity = 20
    		self.canFall=true;
    	}

    	this.moveRight = function(){
    		var next_x_Pos = this.getPosition().x + speed

    		this.setPosition({x:next_x_Pos})
    	}

    	this.moveLeft = function(){
    		var next_x_Pos = this.getPosition().x - speed

    		this.setPosition({x:next_x_Pos})
    	}

    	this.accelerate_y = function(){
    		var next_y_Pos = self.getPosition().y - this.velocity
    		if(self.getPosition().y>0)
    			self.canFall = false

    		if(next_y_Pos>0){
    			self.canFall = false
    			next_y_Pos=0
    		}

    		this.setPosition({y:next_y_Pos})
    	}

    	;(function ani(){
    		self.velocity -= gravity

    		if(self.move_right)
    			self.moveRight()
    		

    		if(self.move_left)
    			self.moveLeft()


    		if (self.canFall)
    			self.accelerate_y()

    		requestAnimationFrame(ani)
    	}())

    	if (typeof settings.x === "number" || typeof settings.y==='number'){
    		this.setPosition(settings)
    	}

    }

    var hero = new Combatant({
    	x:0,
    	y:0,
    	node: $('.hero')
    })

    
    //loosely coupled system
    $(document).on('keyup' , function(e){
    	if(e.keyCode==39)
    		hero.move_right = false
    	if(e.keyCode==37)
    		hero.move_left = false
	})

    $(document).on('keydown' , function(e){
    	if(e.keyCode==39)
    		hero.move_right = true
    	if(e.keyCode==37)
    		hero.move_left = true
    	if(e.keyCode==38 && !hero.canFall)
    		hero.jump()
    })

}