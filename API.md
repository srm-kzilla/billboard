# Billboard
----
  Ink the link.

## Default template
* **URL**

  `https://billboard.srmkzilla.net/api/blog`

* **Method:**
  
  `GET`

*  **URL Params**

   **Optional:**
 
   `title=[alphanumeric]` - The title to be displayed (defaults to `With love from SRMKZILLA`)

   `subtitle=[alphanumeric]` - The subtitle to be displayed (defaults to `@srmkzilla`)

   `theme=[dark|light]` - The theme to be used (defaults to `light`)

   `fontSize=[numeric+px]` - The font size of the title (defaults to `auto`)
   
   `fileType=[jpeg|png]` - The file format to be generated (defaults to `jpeg`)

* **Success Response:**

  * **Code:** 200

    **Content-Type:** `image/png` or `image/jpeg`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR

    **Content:** `{code: 500, message:'Unexpected Server Error. Our best minds are working on this issue right now. Apologies for the inconvinience.'}`


* **Sample Call:**

  [https://billboard.srmkzilla.net/api/blog?title=Billboard&subtitle=Ink%20the%20link.&fileType=jpeg&theme=dark&fontSize=180px](https://billboard.srmkzilla.net/api/blog?title=Billboard&subtitle=Ink%20the%20link.&fileType=jpeg&theme=dark&fontSize=180px)


## Custom Background

* **URL**

  `https://billboard.srmkzilla.net/api/custom`

* **Method:**
  
  `POST`

*  **URL Params**

    **Required:**

    `image=[image/*]` - The custom background image to be used

   **Optional:**
 
   `title=[alphanumeric]` - The title to be displayed (defaults to `With love from SRMKZILLA`)

   `subtitle=[alphanumeric]` - The subtitle to be displayed (defaults to `@srmkzilla`)

   `theme=[dark|light]` - The theme to be used (defaults to `light`)

   `fontSize=[numeric+px]` - The font size of the title (defaults to `auto`)
   
   `fileType=[jpeg|png]` - The file format to be generated (defaults to `jpeg`)

* **Success Response:**

  * **Code:** 200

    **Content-Type:** `image/png` or `image/jpeg`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR

    **Content:** `{code: 500, message:'Unexpected Server Error. Our best minds are working on this issue right now. Apologies for the inconvinience.'}`

