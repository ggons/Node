const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // Do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 2000);
      
        // return v && v.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',  // req.body.name
    author: 'gons3',
    category: ' Web ',
    // category: 'mobile',
    tags: ['frontend'],
    // tags: null,
    isPublished: true,
    price: 100.5
  });

  try {
    const result = await course.save();
    console.log(result);

  } catch (e) {
    for (field in e.errors) {
      console.log(e.errors[field].message);
    }
    // console.log(e.message);
  }
}

createCourse();
// getCourses();

async function getCourses() {
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)
  // .find({ price: { $gte: 10, $lte: 20 } })
  // .find({ price: { $in: [10, 15, 20] } })

// or
// and
  // .or([{ author: 'gons' }, { isPublished: true }])
  // .and([  ])

// Starts with gons
  // .find({ author: /^gons/ })

// End with Hamedani
  // .find({ author: /Hamedani$/i })

// Contains gons
  // .find({ author: /.*gons.*/ })

// /api/courses?pageNumber=2&pageSize=10
  // const pageNumber = 2;
  // const pageSize = 10;
  // .skip((pageNumber - 1) * pageSize)
  // .limit(pageSize)

  const courses = await Course
    .find({ _id: '5b77cfaa9110f80110a276da' })
    // .limit(10)
    // .sort({ name: 1 })
    .select({ name: 1, price: 1 })
    // .count()
  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true }); // new : 새로운거 반환, default 는 이전거 반환

  console.log(course);
}

/*
async function updateCourse(id) {
  const result = await Course.update({ _id: id}, {
    $set: {
      author: 'Mosh2',
      isPublished: false
    }
  });

  console.log(result);
}
*/
/*
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return ;

  course.isPublished = true;
  course.author = 'Another Author';

  // course.set({
  //   isPublished: true,
  //   author: 'Another Author2'
  // });

  const result = await course.save();
  console.log(result);
}
*/

async function removeCourse(id) {
  // const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  // const result = await Course.deleteOne({ _id: id });
  console.log(course);
}

// removeCourse('5b77a083bf23363580ae97de');
// updateCourse('5b77a0258eb658372cbdc446');