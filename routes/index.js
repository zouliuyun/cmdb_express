
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');
var async = require('async');
module.exports = function(app){
//localhost:3001/ 请求地址
app.get('/',function(req,res){
	res.render('index.html', {  
  	 title:"Infra CMDB", 
	   name:"Infra CMDB",
	   user:req.session.user,
	   error:req.flash('error').toString(),
	   success:req.flash('success').toString()

	});


});

app.get('/s1',function(req,res){
	User.Search(function(asset){
		res.render('s1.html',{
		lists:asset,
		user:req.session.user
		})

	})


})


app.get('/search',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		l1:{},
		   user:req.session.user
		})
	}else{
		User.Search(function(asset){
		res.render('search.html',{
		lists:asset,
		l1:{},
		user:req.session.user
		})

			})
		}

})

app.get('/searchonly',function(req,res){
        if(!req.session.user || req.session.user==null){
                res.render('index.html',{
                   title:"Infra CMDB",
                   name:"Infra CMDB",
                l1:{},
                   user:req.session.user
                })
        }else{
                User.Search(function(asset){
		console.log(req.session.user.name);
                res.render('searchonly.html',{
                lista:asset,
                l1:{},
                user:req.session.user
                })

                        })
                }

})

app.get('/add',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		l1:{},
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		res.render('add.html',{
	l1:{},
		user:req.session.user
		})
	}
})

app.get('/xiugai',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		User.Search(function(asset){
		res.render('xiugai.html',{
			lists:asset,
			user:req.session.user
		})

		})
	}
})



app.get('/out',function(req,res){
	req.session.user=null; 
	console.log(req.session.user+'aaaaa');
	})

  //http://localhost:3000/loginout  登出请求地址
app.get('/loginout',function(req,res){
		req.session.user = null;
		req.flash('success','登出成功');
		res.redirect('/');


		});
//发送登陆信息接受地址http://localhost:3000/login
app.post('/login',function(req,res){
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name:req.body.name,
		password:password
	});
	User.get(newUser.name,function(err,user){
		if(user){
			if(user.password != password){
				req.flash('error','密码不正确');
				res.redirect('/');
			}else{
				if(newUser.name=="suyi"){
						req.session.user = user;
						 res.redirect('/searchonly');
						}				
					else{

				req.session.user = user;
				res.redirect('/show');
			}}
		}else{
			req.flash('error','用户不存在');
			res.redirect('/');
			}



		})

});
//发送注册信息接受地址http://localhost:3000/reg
app.post('/reg',function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	var password_re = req.body.repassword;
	if(password_re!=password){
		req.flash('error','两次输入的密码不一致！请确认！');
		return res.redirect('/');
	}
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name:req.body.name,
		password:password
	});
	User.get(newUser.name,function(err,user){
		if(user){
			err = "用户已经存在！";
			}
		if(err){
			req.flash('error',err);
			return res.redirect('/');
			}
	newUser.save(function(err,user){
		if(err){
		req.flash('error',err);
		return res.redirect('/');
		}
//req.session.user = user;
		req.flash('success','注册成功！');
		res.redirect('/');
		});
		});
});

//http://localhost:3001/cgpasswd 修改密码
app.post('/cgpasswd',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		var md5 = crypto.createHash('md5');
		var name = req.session.user.name;
		var newpassword = md5.update(req.body.newpd).digest('hex');
		var md5 = crypto.createHash('md5');
		var renewpassword = md5.update(req.body.renewpassword).digest('hex');

	User.cgpasswd(name,newpassword,function(err,result){
		if(err){
			 res.send({"status":0});
		}

		 res.send({"status":1});
		req.session.user = null;
		console.log("success!!!!");

		})

		}



})

app.post('/searchitem',function(req,res){
	var item={};
	item.hostname=req.body.hostname;
	item.ip=req.body.ip;
	item.project=req.body.project;
	item.gip=req.body.gip;
	item.loip=req.body.loip;
	item.cabinet=req.body.cabinet;
	item.asset=req.body.asset;

	User.SearchItem(item,function(asset){
		res.render('search.html',{
		lists:asset,
		user:req.session.user
		})



console.log("fuck!");
})


})




    //http://localhost:3000/show  网站登陆后内容展示页
app.get('/show',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		User.getQuestion(function(data){
		if(data.length==0){
		res.render('show.html',{
		lists:data,
		l1:{},
		user:req.session.user
		});
		return;
		}
	for(var i=0,l=data.length;i<l;i++){
		data[i].url="/people/"+data[i].name;
		data[i].imgUrl=data[i].imgUrl.replace("./public/","");
	}
	res.render('show.html',{
		lists:data,
		l1:{},
		user:req.session.user
		})
	})

/*res.render('show.html', {
   title:"Infra CMDB",
   name:"Infra CMDB",
   user:req.session.user
});  
*/
 }
 });
   //ajax异步的get请求获取地址http://localhost:3000/getQuestion
 app.get('/getQuestion',function(req,res){
	if(!req.session.user){
		res.render('index.html',{
		   title:"Infra CMDB",
		l1:{},
		   name:"Infra CMDB",
		   user:req.session.user
	})
	}else{
		User.getQuestionPage(req.query.page,function(data){
			for(var i=0,l=data.length;i<l;i++){
			data[i].imgUrl=data[i].imgUrl.replace("./public/","");
			}	
			res.send(data);
			})
	}
    });
    //http://localhost:3000/people/tang  tang这个用户的展示页面
 app.get('/people/:user',function(req,res){
    });
    //发生编辑和修改个人信息的请求地址http://localhost:3000/people
 app.post('/people',function(req,res){

    });
   //http://localhost:3000/question/1 具体问题展示页
app.get('/question/:id',function(req,res){
	if(!req.session.user){
		res.render('index.html',{
 		  title:"Infra CMDB",
		l1:{},	  	
	 name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
	User.findQuestion(req.params.id,function(err,items){
		res.render('question.html',{
			items:items[0],
		l1:{},	
		user:req.session.user,
			id:req.params.id,

		})

	})   
}
	 });
    //http://localhost:3000/error 404和错误页面展示地址
app.get('/error',function(req,res){
    });
    //ajax异步提问发生问题地址http://localhost:3000/ask
 app.post('/ask',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
	})
	}else{
		var ask={};
		ask.title=req.body.title;//post发送的问题标题
		ask.askText=req.body.askText;//post发送的问题内容
		ask.answer=[];//设置一个空数组，以后push回答
		ask.name=req.session.user.name;//提问者名字
	
		User.ask(ask,function(err,doc){
		if(err){
		req.flash('error',err);
		return res.redirect('/show');
			}
	//如果成功存入，返回{"status":1}给客户端
		res.send({"status":1});
	})
}

    });
   //ajax异步回答问题地址http://localhost:3000/answer
   //
   //

app.post('/chaxun',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
	})
	}else{
		var servertag = req.body.servertag;
		User.findItembyServerTag(servertag,function(asset){
			res.render('xiugai.html',{
			list:asset,
			user:req.session.user,
			});
		})
	}
})

 
app.post('/additem',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		var item={};
		item.hostname=req.body.hostname;
		item.ip=req.body.ip;
		item.project=req.body.project;
		item.gip=req.body.gip;
		item.loip=req.body.loip;
		item.cabinet=req.body.cabinet;
		item.servertag=req.body.servertag;
		item.asset=req.body.asset;
		item.disk=req.body.disk;
		item.cpu=req.body.cpu;
		item.memory=req.body.memory;
		console.log(item.disk)
		console.log(item.hostname);

		User.findItembyServerTag(item.servertag,function(err,asset){
			if(asset){
		res.send({"status":9});
		}
			else{
		User.findItem(item.hostname,function(err,asset){
		if(asset){
			console.log("1");
			res.send({"status":0});
			console.log("2")
		}
		else
		{
		User.findItembyip(item.ip,function(err,asset){
			if(asset){
				console.log("01");
           		     res.send({"status":3});
       		         console.log("02")
			}
		else{
		User.findItembyloip(item.loip,function(err,asset){
			if(asset){
				res.send({"status":5});
			}
		else{
		User.addItem(item,function(err,doc){
			if(err){
				 res.send({"status":-1});
			}
		res.send({"status":1});
	})}})}})}})}})
}
})

app.post('/answer',function(req,res){
	var answer={};
	answer.answer=req.body.answer;
	answer.user=req.session.user;
	questionId=req.body.questionId;
	User.answer(questionId,answer,function(info){
		res.redirect('/question/'+questionId);
	})

    });
    //百度百科爬虫获取地址
app.get('/baike',function(req,res){
    });
     //后台管理
app.get('/admin',function(req,res){
    });
      //管理员登陆发送信息地址
 app.post('/adminLogin',function(req,res){  
    });
    //信息管理页面地址
 app.get('/admincon',function(req,res){
    });
    //发生修改信息地址
 app.post('/adminchange',function(req,res){
    });



app.post('/cgitem',function(req,res){
	if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
		res.render('index.html',{
		   title:"Infra CMDB",
		   name:"Infra CMDB",
		   user:req.session.user
		})
	}else{
		var item={};
		item.hostname=req.body.hostname;
		item.ip=req.body.ip;
		item.project=req.body.project;
		item.gip=req.body.gip;
		item.loip=req.body.loip;
		item.cabinet=req.body.cabinet;
		item.servertag=req.body.servertag;
		item.asset=req.body.asset;
		item.disk=req.body.disk;
		item.memory=req.body.memory;
		item.cpu=req.body.cpu;
		console.log(item.servertag);

		User.findItembyServerTag(item.servertag,function(err,asset){
			if(asset){
			User.cgItem(item,function(err,asset){
				if(asset){
					res.send({"status":0});
				}

				})

				}
				else{
					res.send({"status":9});
				}
			})
		}
		})

app.post('/findbyservertag',function(req,res){
        if(!req.session.user || req.session.user==null || req.session.user.name=="suyi"){
                res.render('index.html',{
                   title:"Infra CMDB",
                   name:"Infra CMDB",
                   user:req.session.user
        })
        }else{
                var servertag = req.body.servertag;
                User.findItembyServerTag(servertag,function(err,asset){
                if(asset){
console.log(asset);
res.send(asset);                

}
else{
 res.send({"status":9});
}

		})
        }
})







}



