/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50742
Source Host           : localhost:3306
Source Database       : db_tntd

Target Server Type    : MYSQL
Target Server Version : 50742
File Encoding         : 65001

Date: 2023-11-17 09:37:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `kode_bank_umum`
-- ----------------------------
DROP TABLE IF EXISTS `kode_bank_umum`;
CREATE TABLE `kode_bank_umum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_bank` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `kode_bank` varchar(200) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`kode_bank`)
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of kode_bank_umum
-- ----------------------------
INSERT INTO `kode_bank_umum` VALUES ('1', 'Bank BCA', '014', null, null);
INSERT INTO `kode_bank_umum` VALUES ('10', 'Bank Tabungan Pensiunan Nasional (BTPN)', '213', null, null);
INSERT INTO `kode_bank_umum` VALUES ('100', 'Bank Harmoni International', '166', null, null);
INSERT INTO `kode_bank_umum` VALUES ('100', 'Bank Jateng Syariah', '725', null, null);
INSERT INTO `kode_bank_umum` VALUES ('101', 'Bank QNB Kesawan (Bank QNB Indonesia)', '167', null, null);
INSERT INTO `kode_bank_umum` VALUES ('102', 'Bank Himpunan Saudara 1906', '212', null, null);
INSERT INTO `kode_bank_umum` VALUES ('103', 'Bank Swaguna', '405', null, null);
INSERT INTO `kode_bank_umum` VALUES ('104', 'Bank Jasa Jakarta', '427', null, null);
INSERT INTO `kode_bank_umum` VALUES ('105', 'Bank Bisnis Internasional', '459', null, null);
INSERT INTO `kode_bank_umum` VALUES ('106', 'Bank Sri Partha', '466', null, null);
INSERT INTO `kode_bank_umum` VALUES ('107', 'Bank Jasa Jakarta', '472', null, null);
INSERT INTO `kode_bank_umum` VALUES ('108', 'Bank Bintang Manunggal', '484', null, null);
INSERT INTO `kode_bank_umum` VALUES ('109', 'Bank MNC / Bank Bumiputera', '485', null, null);
INSERT INTO `kode_bank_umum` VALUES ('110', 'Bank Yudha Bhakti', '490', null, null);
INSERT INTO `kode_bank_umum` VALUES ('111', 'Bank BRI Agro', '494', null, null);
INSERT INTO `kode_bank_umum` VALUES ('112', 'Bank Indomonex (Bank SBI Indonesia)', '498', null, null);
INSERT INTO `kode_bank_umum` VALUES ('113', 'Bank Royal Indonesia', '501', null, null);
INSERT INTO `kode_bank_umum` VALUES ('114', 'Bank Alfindo (Bank National Nobu)', '503', null, null);
INSERT INTO `kode_bank_umum` VALUES ('115', 'Bank Syariah Mega', '506', null, null);
INSERT INTO `kode_bank_umum` VALUES ('116', 'Bank Ina Perdana', '513', null, null);
INSERT INTO `kode_bank_umum` VALUES ('117', 'Bank Harfa', '517', null, null);
INSERT INTO `kode_bank_umum` VALUES ('118', 'Prima Master Bank', '520', null, null);
INSERT INTO `kode_bank_umum` VALUES ('119', 'Bank Persyarikatan Indonesia', '521', null, null);
INSERT INTO `kode_bank_umum` VALUES ('12', 'Bank BRI Syariah', '422', null, null);
INSERT INTO `kode_bank_umum` VALUES ('120', 'Bank Akita', '525', null, null);
INSERT INTO `kode_bank_umum` VALUES ('121', 'Liman International Bank', '526', null, null);
INSERT INTO `kode_bank_umum` VALUES ('122', 'Anglomas Internasional Bank', '531', null, null);
INSERT INTO `kode_bank_umum` VALUES ('123', 'Bank Dipo International (Bank Sahabat Sampoerna)', '523', null, null);
INSERT INTO `kode_bank_umum` VALUES ('124', 'Bank Kesejahteraan Ekonomi', '535', null, null);
INSERT INTO `kode_bank_umum` VALUES ('125', 'Bank Artos IND', '542', null, null);
INSERT INTO `kode_bank_umum` VALUES ('126', 'Bank Purba Danarta', '547', null, null);
INSERT INTO `kode_bank_umum` VALUES ('127', 'Bank Multi Arta Sentosa', '548', null, null);
INSERT INTO `kode_bank_umum` VALUES ('128', 'Bank Mayora Indonesia', '553', null, null);
INSERT INTO `kode_bank_umum` VALUES ('129', 'Bank Index Selindo', '555', null, null);
INSERT INTO `kode_bank_umum` VALUES ('13', 'Bank Tabungan Negara (BTN)', '200', null, null);
INSERT INTO `kode_bank_umum` VALUES ('130', 'Centratama Nasional Bank', '559', null, null);
INSERT INTO `kode_bank_umum` VALUES ('131', 'Bank Victoria International', '566', null, null);
INSERT INTO `kode_bank_umum` VALUES ('132', 'Bank Fama Internasional', '562', null, null);
INSERT INTO `kode_bank_umum` VALUES ('133', 'Bank Mandiri Taspen Pos', '564', null, null);
INSERT INTO `kode_bank_umum` VALUES ('134', 'Bank Harda', '567', null, null);
INSERT INTO `kode_bank_umum` VALUES ('135', 'BPR KS', '688', null, null);
INSERT INTO `kode_bank_umum` VALUES ('136', 'Bank Agris', '945', null, null);
INSERT INTO `kode_bank_umum` VALUES ('137', 'Bank Merincorp', '946', null, null);
INSERT INTO `kode_bank_umum` VALUES ('138', 'Bank Maybank Indocorp', '947', null, null);
INSERT INTO `kode_bank_umum` VALUES ('139', 'Bank OCBC – Indonesia', '948', null, null);
INSERT INTO `kode_bank_umum` VALUES ('14', 'Permata Bank', '013', null, null);
INSERT INTO `kode_bank_umum` VALUES ('140', 'Bank CTBC (China Trust) Indonesia', '949', null, null);
INSERT INTO `kode_bank_umum` VALUES ('15', 'Bank Danamon', '011', null, null);
INSERT INTO `kode_bank_umum` VALUES ('16', 'Bank BII Maybank', '016', null, null);
INSERT INTO `kode_bank_umum` VALUES ('17', 'Bank Mega', '426', null, null);
INSERT INTO `kode_bank_umum` VALUES ('18', 'Bank Sinarmas', '153', null, null);
INSERT INTO `kode_bank_umum` VALUES ('19', 'Bank Commonwealth', '950', null, null);
INSERT INTO `kode_bank_umum` VALUES ('2', 'Bank Mandiri', '008', null, null);
INSERT INTO `kode_bank_umum` VALUES ('20', 'Bank OCBC NISP', '028', null, null);
INSERT INTO `kode_bank_umum` VALUES ('21', 'Bank Bukopin', '441', null, null);
INSERT INTO `kode_bank_umum` VALUES ('22', 'Bank BCA Syariah', '536', null, null);
INSERT INTO `kode_bank_umum` VALUES ('23', 'Bank Lippo', '026', null, null);
INSERT INTO `kode_bank_umum` VALUES ('24', 'Citibank', '031', null, null);
INSERT INTO `kode_bank_umum` VALUES ('25', 'Indosat Dompetku', '789', null, null);
INSERT INTO `kode_bank_umum` VALUES ('26', 'Telkomsel Tcash', '911', null, null);
INSERT INTO `kode_bank_umum` VALUES ('27', 'Bank Jabar dan Banten (BJB)', '110', null, null);
INSERT INTO `kode_bank_umum` VALUES ('28', 'Bank DKI', '111', null, null);
INSERT INTO `kode_bank_umum` VALUES ('29', 'BPD DIY', '112', null, null);
INSERT INTO `kode_bank_umum` VALUES ('3', 'Bank BNI', '009', null, null);
INSERT INTO `kode_bank_umum` VALUES ('30', 'Bank Jateng', '113', null, null);
INSERT INTO `kode_bank_umum` VALUES ('31', 'Bank Jatim', '114', null, null);
INSERT INTO `kode_bank_umum` VALUES ('32', 'BPD Jambi', '115', null, null);
INSERT INTO `kode_bank_umum` VALUES ('33', 'BPD Aceh, BPD Aceh Syariah', '116', null, null);
INSERT INTO `kode_bank_umum` VALUES ('34', 'Bank Sumut', '117', null, null);
INSERT INTO `kode_bank_umum` VALUES ('35', 'Bank Nagari', '118', null, null);
INSERT INTO `kode_bank_umum` VALUES ('36', 'Bank Riau', '119', null, null);
INSERT INTO `kode_bank_umum` VALUES ('37', 'Bank Sumsel Babel', '120', null, null);
INSERT INTO `kode_bank_umum` VALUES ('38', 'Bank Lampung', '121', null, null);
INSERT INTO `kode_bank_umum` VALUES ('39', 'Bank Kalsel', '122', null, null);
INSERT INTO `kode_bank_umum` VALUES ('4', 'Bank BNI Syariah', '427', null, null);
INSERT INTO `kode_bank_umum` VALUES ('40', 'Bank Kalimantan Barat', '123', null, null);
INSERT INTO `kode_bank_umum` VALUES ('41', 'Bank Kalimantan Timur dan Utara', '124', null, null);
INSERT INTO `kode_bank_umum` VALUES ('42', 'Bank Kalteng', '125', null, null);
INSERT INTO `kode_bank_umum` VALUES ('43', 'Bank Sulsel dan Barat', '126', null, null);
INSERT INTO `kode_bank_umum` VALUES ('44', 'Bank Sulut Gorontalo', '127', null, null);
INSERT INTO `kode_bank_umum` VALUES ('45', 'Bank NTB, NTB Syariah', '128', null, null);
INSERT INTO `kode_bank_umum` VALUES ('46', 'BPD Bali', '129', null, null);
INSERT INTO `kode_bank_umum` VALUES ('47', 'Bank NTT', '130', null, null);
INSERT INTO `kode_bank_umum` VALUES ('48', 'Bank Maluku Malut', '131', null, null);
INSERT INTO `kode_bank_umum` VALUES ('49', 'Bank Papua', '132', null, null);
INSERT INTO `kode_bank_umum` VALUES ('5', 'Bank BRI', '002', null, null);
INSERT INTO `kode_bank_umum` VALUES ('50', 'Bank Bengkulu', '133', null, null);
INSERT INTO `kode_bank_umum` VALUES ('51', 'Bank Sulawesi Tengah', '134', null, null);
INSERT INTO `kode_bank_umum` VALUES ('52', 'Bank Sultra', '135', null, null);
INSERT INTO `kode_bank_umum` VALUES ('53', 'Bank Ekspor Indonesia', '003', null, null);
INSERT INTO `kode_bank_umum` VALUES ('54', 'Bank Panin', '019', null, null);
INSERT INTO `kode_bank_umum` VALUES ('55', 'Bank Arta Niaga Kencana', '020', null, null);
INSERT INTO `kode_bank_umum` VALUES ('56', 'Bank UOB Indonesia', '023', null, null);
INSERT INTO `kode_bank_umum` VALUES ('57', 'American Express Bank LTD', '030', null, null);
INSERT INTO `kode_bank_umum` VALUES ('58', 'Citibank N.A', '031', null, null);
INSERT INTO `kode_bank_umum` VALUES ('59', 'JP. Morgan Chase Bank, N.A', '032', null, null);
INSERT INTO `kode_bank_umum` VALUES ('6', 'Bank Syariah Mandiri', '451', null, null);
INSERT INTO `kode_bank_umum` VALUES ('60', 'Bank of America, N.A', '033', null, null);
INSERT INTO `kode_bank_umum` VALUES ('61', 'ING Indonesia Bank', '034', null, null);
INSERT INTO `kode_bank_umum` VALUES ('62', 'Link Aja', '911', null, null);
INSERT INTO `kode_bank_umum` VALUES ('63', 'Bank Artha Graha Internasional', '037', null, null);
INSERT INTO `kode_bank_umum` VALUES ('64', 'Bank Credit Agricole Indosuez', '039', null, null);
INSERT INTO `kode_bank_umum` VALUES ('65', 'The Bangkok Bank Comp. LTD', '040', null, null);
INSERT INTO `kode_bank_umum` VALUES ('66', 'The Hongkong & Shanghai B.C. (Bank HSBC)', '041', null, null);
INSERT INTO `kode_bank_umum` VALUES ('67', 'The Bank of Tokyo Mitsubishi UFJ LTD', '042', null, null);
INSERT INTO `kode_bank_umum` VALUES ('68', 'Bank Sumitomo Mitsui Indonesia', '045', null, null);
INSERT INTO `kode_bank_umum` VALUES ('69', 'Bank DBS Indonesia', '046', null, null);
INSERT INTO `kode_bank_umum` VALUES ('7', 'Bank CIMB Niaga', '022', null, null);
INSERT INTO `kode_bank_umum` VALUES ('70', 'Bank Resona Perdania', '047', null, null);
INSERT INTO `kode_bank_umum` VALUES ('71', 'Bank Mizuho Indonesia', '048', null, null);
INSERT INTO `kode_bank_umum` VALUES ('72', 'Standard Chartered Bank', '050', null, null);
INSERT INTO `kode_bank_umum` VALUES ('73', 'Bank ABN Amro', '052', null, null);
INSERT INTO `kode_bank_umum` VALUES ('74', 'Bank Keppel Tatlee Buana', '053', null, null);
INSERT INTO `kode_bank_umum` VALUES ('75', 'Bank Capital Indonesia', '054', null, null);
INSERT INTO `kode_bank_umum` VALUES ('76', 'Bank BNP Paribas Indonesia', '057', null, null);
INSERT INTO `kode_bank_umum` VALUES ('78', 'Korea Exchange Bank Danamon', '059', null, null);
INSERT INTO `kode_bank_umum` VALUES ('79', 'Bank BJB Syariah', '425', null, null);
INSERT INTO `kode_bank_umum` VALUES ('80', 'Bank ANZ Indonesia', '061', null, null);
INSERT INTO `kode_bank_umum` VALUES ('81', 'Deutsche Bank AG.', '067', null, null);
INSERT INTO `kode_bank_umum` VALUES ('82', 'Bank Woori Indonesia', '068', null, null);
INSERT INTO `kode_bank_umum` VALUES ('83', 'Bank OF China ', '069', null, null);
INSERT INTO `kode_bank_umum` VALUES ('84', 'Bank Bumi Arta', '076', null, null);
INSERT INTO `kode_bank_umum` VALUES ('85', 'Bank Ekonomi', '087', null, null);
INSERT INTO `kode_bank_umum` VALUES ('86', 'Bank Antardaerah', '088', null, null);
INSERT INTO `kode_bank_umum` VALUES ('87', 'Bank Haga', '089', null, null);
INSERT INTO `kode_bank_umum` VALUES ('88', 'Bank IFI', '093', null, null);
INSERT INTO `kode_bank_umum` VALUES ('89', 'Bank JTRUST', '095', null, null);
INSERT INTO `kode_bank_umum` VALUES ('9', 'Bank Muamalat', '147', null, null);
INSERT INTO `kode_bank_umum` VALUES ('90', 'Bank Mayapada', '097', null, null);
INSERT INTO `kode_bank_umum` VALUES ('91', 'Bank Nusantara Parahyangan', '145', null, null);
INSERT INTO `kode_bank_umum` VALUES ('92', 'Bank of India Indonesia', '146', null, null);
INSERT INTO `kode_bank_umum` VALUES ('93', 'Bank Mestika Dharma', '151', null, null);
INSERT INTO `kode_bank_umum` VALUES ('94', 'Bank Metro Express (Bank Shinhan Indonesia)', '152', null, null);
INSERT INTO `kode_bank_umum` VALUES ('95', 'Bank Maspion Indonesia', '157', null, null);
INSERT INTO `kode_bank_umum` VALUES ('96', 'Bank Hagakita', '159', null, null);
INSERT INTO `kode_bank_umum` VALUES ('97', 'Bank Ganesha', '161', null, null);
INSERT INTO `kode_bank_umum` VALUES ('98', 'Bank Windu Kentjana', '162', null, null);
INSERT INTO `kode_bank_umum` VALUES ('99', 'Halim Indonesia Bank (Bank ICBC Indonesia)', '164', null, null);

-- ----------------------------
-- Table structure for `kode_kantor`
-- ----------------------------
DROP TABLE IF EXISTS `kode_kantor`;
CREATE TABLE `kode_kantor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_kantor_kas` char(4) NOT NULL,
  `kode_kantor` char(4) DEFAULT NULL,
  `nama_kantor` char(40) DEFAULT NULL,
  `alamat_kantor` char(40) DEFAULT NULL,
  `kota_kantor` char(15) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `status` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of kode_kantor
-- ----------------------------
INSERT INTO `kode_kantor` VALUES ('1', '01', '01', 'Kantor Pusat', null, null, null, null, null);

-- ----------------------------
-- Table structure for `log_user`
-- ----------------------------
DROP TABLE IF EXISTS `log_user`;
CREATE TABLE `log_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `user_ibs` varchar(255) NOT NULL,
  `ip_address` varchar(30) NOT NULL,
  `action` varchar(200) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log_user
-- ----------------------------
INSERT INTO `log_user` VALUES ('1', '1f59fd6f-5089-4871-b446-7e0b77e5cca7', '', '::1', 'Login', 'users', '2023-11-17 08:56:05', '2023-11-17 08:56:05');
INSERT INTO `log_user` VALUES ('2', '283c2ed6-5447-49eb-8c71-7560dfd5548d', '', '::1', 'Logout', 'users', '2023-11-17 08:56:36', '2023-11-17 08:56:36');

-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_aba`
-- ----------------------------
DROP TABLE IF EXISTS `tb_aba`;
CREATE TABLE `tb_aba` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `norek_aba` varchar(50) DEFAULT NULL,
  `nama_aba` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `jenis_aba` varchar(10) DEFAULT NULL,
  `no_alternatif` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of tb_aba
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_config`
-- ----------------------------
DROP TABLE IF EXISTS `tb_config`;
CREATE TABLE `tb_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyname` varchar(255) NOT NULL,
  `keyvalue` varchar(255) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_config
-- ----------------------------
INSERT INTO `tb_config` VALUES ('1', 'jam_mulai', '00:00:00', 'Minimal Jam Login', '2023-05-16 06:29:05', '2023-11-15 16:13:07');
INSERT INTO `tb_config` VALUES ('2', 'jam_selesai', '00:00:00', 'Maksimal Jam Login', '2023-10-31 13:24:15', '2023-11-15 16:13:13');
INSERT INTO `tb_config` VALUES ('3', 'verify_pencairan_desa', 'kec', 'Isikan \'des\' jika kewenangan pada Desa, isikan \'kec\' jika kewenangan pada Kecamatan, isikan \'kab\' jika kewenangan pada Kabupaten', '2023-11-11 13:03:32', '2023-11-15 11:54:19');

-- ----------------------------
-- Table structure for `tb_daftar_menu`
-- ----------------------------
DROP TABLE IF EXISTS `tb_daftar_menu`;
CREATE TABLE `tb_daftar_menu` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nama_menu` varchar(100) DEFAULT NULL,
  `icon_menu` varchar(100) DEFAULT NULL,
  `key_active` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_daftar_menu
-- ----------------------------
INSERT INTO `tb_daftar_menu` VALUES ('1', 'Dashboard', 'IoGridSharp', 'dashboard', '2023-09-21 13:05:58', '2023-09-21 13:06:01');
INSERT INTO `tb_daftar_menu` VALUES ('2', 'Daftar TNT', 'IoRibbonOutline', 'listtnt', '2023-09-21 13:06:41', '2023-09-21 13:06:45');
INSERT INTO `tb_daftar_menu` VALUES ('5', 'Setting', 'IoSettingsOutline', null, '2023-09-22 10:27:48', '2023-09-22 10:27:52');
INSERT INTO `tb_daftar_menu` VALUES ('3', 'Pencairan Desa', 'IoStarOutline', 'pencairandesa', '2023-09-26 08:30:28', '2023-09-26 08:30:31');
INSERT INTO `tb_daftar_menu` VALUES ('4', 'Trans Desa', 'IoReceiptOutline', 'transdesa', '2023-10-03 08:49:51', '2023-10-03 08:49:54');

-- ----------------------------
-- Table structure for `tb_daftar_sub_menu`
-- ----------------------------
DROP TABLE IF EXISTS `tb_daftar_sub_menu`;
CREATE TABLE `tb_daftar_sub_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` varchar(6) DEFAULT NULL,
  `nama_sub_menu` varchar(100) DEFAULT NULL,
  `key_active_sub_menu` varchar(50) DEFAULT NULL,
  `icon_sub_menu` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_daftar_sub_menu
-- ----------------------------
INSERT INTO `tb_daftar_sub_menu` VALUES ('3', '5', 'Ref Kantor', 'reffkantor', 'IoStorefrontOutline', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('4', '5', 'Ref Kecamatan', 'reffkecamatan', 'IoStorefrontOutline', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('5', '5', 'Ref Desa', 'reffdesa', 'IoStorefrontOutline', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('6', '5', 'User Internal', 'users', 'IoPeopleOutline', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('7', '5', 'User External', 'usersext', 'IoPeople', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('1', '5', 'Config App', 'configapp', 'IoConstructOutline', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('2', '5', 'Instansi', 'instansi', 'IoBusiness', null, null);
INSERT INTO `tb_daftar_sub_menu` VALUES ('8', '5', 'Ref Aba', 'reffaba', 'IoLogoAngular', null, null);

-- ----------------------------
-- Table structure for `tb_instansi`
-- ----------------------------
DROP TABLE IF EXISTS `tb_instansi`;
CREATE TABLE `tb_instansi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instansi_logo` varchar(255) NOT NULL,
  `instansi_nama` varchar(150) NOT NULL,
  `instansi_alamat` varchar(255) DEFAULT NULL,
  `instansi_telp` varchar(255) DEFAULT NULL,
  `warna_slip` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_instansi
-- ----------------------------
INSERT INTO `tb_instansi` VALUES ('1', 'logo.png', 'PT BPR ANDA', 'Jl. Alamat anda No xx Kota Anda', 'Telp. (xxxx) xxxxxx, Email admin@gmail.com', '#0070C0', '2023-11-01 09:39:18', '2023-11-15 12:08:46');

-- ----------------------------
-- Table structure for `tb_pencairan_desa`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pencairan_desa`;
CREATE TABLE `tb_pencairan_desa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) DEFAULT NULL,
  `pencairan_id` varchar(100) DEFAULT NULL,
  `no_spp` varchar(50) DEFAULT NULL,
  `tgl_entry` date DEFAULT NULL,
  `kode_desa` varchar(10) DEFAULT NULL,
  `nama_desa` varchar(100) DEFAULT NULL,
  `norek_desa` varchar(20) DEFAULT NULL,
  `alamat_desa` varchar(200) DEFAULT NULL,
  `status_pencairan_desa` varchar(30) DEFAULT NULL,
  `kode_kantor` varchar(10) DEFAULT NULL,
  `kode_kantor_kas` varchar(10) DEFAULT NULL,
  `keterangan` varchar(250) DEFAULT NULL,
  `user_created` varchar(50) DEFAULT NULL,
  `user_modified` varchar(50) DEFAULT NULL,
  `status_internal` varchar(50) DEFAULT NULL,
  `status_transfer` varchar(50) DEFAULT NULL,
  `status_pajak` varchar(50) DEFAULT NULL,
  `status_bpjs` varchar(50) DEFAULT NULL,
  `status_trans_internal` varchar(50) DEFAULT NULL,
  `status_trans_external` varchar(50) DEFAULT NULL,
  `is_verified` varchar(20) DEFAULT NULL,
  `is_lock` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_pencairan_desa
-- ----------------------------
INSERT INTO `tb_pencairan_desa` VALUES ('1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_pencairan_desa_file`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pencairan_desa_file`;
CREATE TABLE `tb_pencairan_desa_file` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `file_id_pencairan` varchar(50) DEFAULT NULL,
  `file_id` varchar(50) DEFAULT NULL,
  `file_nama` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_pencairan_desa_file
-- ----------------------------
INSERT INTO `tb_pencairan_desa_file` VALUES ('1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_pencairan_desa_trans`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pencairan_desa_trans`;
CREATE TABLE `tb_pencairan_desa_trans` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `pencairan_id` varchar(50) DEFAULT NULL,
  `norek_sumber` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `nama_sumber` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `kantor_sumber` varchar(3) CHARACTER SET utf8 DEFAULT NULL,
  `jenis_transaksi` varchar(10) DEFAULT NULL,
  `bank_tujuan` varchar(100) DEFAULT NULL,
  `norek_tujuan` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `nama_tujuan` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `nominal_ob` decimal(18,2) DEFAULT NULL,
  `user_created` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `keterangan` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `tgl_entry` date DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `tgl_trans` date DEFAULT NULL,
  `jam_trans` varchar(30) DEFAULT NULL,
  `status_trans` varchar(10) DEFAULT NULL,
  `id_biling` varchar(20) DEFAULT NULL,
  `jenis_pajak` varchar(50) DEFAULT NULL,
  `masa_pajak` varchar(10) DEFAULT NULL,
  `nomor_virtual_account` varchar(20) DEFAULT NULL,
  `perihal` varchar(150) DEFAULT NULL,
  `kode_bank_umum` varchar(10) DEFAULT NULL,
  `tnt_id` varchar(15) DEFAULT NULL,
  `urut_excel` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of tb_pencairan_desa_trans
-- ----------------------------
INSERT INTO `tb_pencairan_desa_trans` VALUES ('1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_reff_desa`
-- ----------------------------
DROP TABLE IF EXISTS `tb_reff_desa`;
CREATE TABLE `tb_reff_desa` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `KODE_DESA` varchar(50) DEFAULT NULL,
  `DESA` varchar(50) NOT NULL,
  `KODE_KECAMATAN` varchar(50) DEFAULT NULL,
  `KECAMATAN` varchar(50) DEFAULT NULL,
  `NO_REKENING` varchar(50) DEFAULT NULL,
  `KODE_KANTOR` varchar(5) DEFAULT NULL,
  `KODE_KANTOR_KAS` varchar(5) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DESA` (`DESA`),
  KEY `KECAMATAN` (`KECAMATAN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_reff_desa
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_reff_kecamatan`
-- ----------------------------
DROP TABLE IF EXISTS `tb_reff_kecamatan`;
CREATE TABLE `tb_reff_kecamatan` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `KODE_KECAMATAN` varchar(50) DEFAULT NULL,
  `KECAMATAN` varchar(50) DEFAULT NULL,
  `ALAMAT` varchar(150) DEFAULT NULL,
  `KODE_KANTOR` varchar(5) DEFAULT NULL,
  `KODE_KANTOR_KAS` varchar(5) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KECAMATAN` (`KECAMATAN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_reff_kecamatan
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_tnt`
-- ----------------------------
DROP TABLE IF EXISTS `tb_tnt`;
CREATE TABLE `tb_tnt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `tnt_id` varchar(20) NOT NULL,
  `sandi_kantor` varchar(10) DEFAULT NULL,
  `sandi_cabang` varchar(10) DEFAULT NULL,
  `jenis_tnt` varchar(10) DEFAULT NULL,
  `nama_nasabah` varchar(100) DEFAULT NULL,
  `alamat_nasabah` varchar(200) DEFAULT NULL,
  `norek_nasabah` varchar(20) DEFAULT NULL,
  `bank_tujuan` varchar(200) DEFAULT NULL,
  `norek_tujuan` varchar(50) DEFAULT NULL,
  `nama_pemilik_rekening_tujuan` varchar(100) DEFAULT NULL,
  `jumlah_disetor` decimal(18,2) DEFAULT NULL,
  `perihal` varchar(200) DEFAULT NULL,
  `catatan` varchar(200) DEFAULT NULL,
  `jenis_pajak` varchar(50) DEFAULT NULL,
  `masa_pajak` varchar(10) DEFAULT NULL,
  `nomor_virtual_account` varchar(20) DEFAULT NULL,
  `id_biling` varchar(20) DEFAULT NULL,
  `note_petugas` varchar(200) DEFAULT NULL,
  `norek_aba` varchar(50) DEFAULT NULL,
  `no_alternatif_aba` varchar(50) DEFAULT NULL,
  `nama_aba` varchar(50) DEFAULT NULL,
  `jenis_aba` varchar(5) DEFAULT NULL,
  `user_processed` varchar(20) DEFAULT NULL,
  `processed_at` datetime DEFAULT NULL,
  `user_created` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_modified` varchar(20) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `is_lock` varchar(10) DEFAULT NULL,
  `tgl_permohonan` date DEFAULT NULL,
  `user_finished` varchar(10) DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `pencairan_id` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`,`tnt_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_tnt
-- ----------------------------
INSERT INTO `tb_tnt` VALUES ('1', null, '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Pending', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_tnt_file_request`
-- ----------------------------
DROP TABLE IF EXISTS `tb_tnt_file_request`;
CREATE TABLE `tb_tnt_file_request` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `file_id_tnt` varchar(50) DEFAULT NULL,
  `file_id` varchar(50) DEFAULT NULL,
  `file_nama` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_tnt_file_request
-- ----------------------------
INSERT INTO `tb_tnt_file_request` VALUES ('1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_tnt_file_respon`
-- ----------------------------
DROP TABLE IF EXISTS `tb_tnt_file_respon`;
CREATE TABLE `tb_tnt_file_respon` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `file_id_tnt` varchar(50) DEFAULT NULL,
  `file_id` varchar(50) DEFAULT NULL,
  `file_nama` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_tnt_file_respon
-- ----------------------------
INSERT INTO `tb_tnt_file_respon` VALUES ('1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `kode_user_cbs` varchar(5) NOT NULL,
  `nama_user_cbs` varchar(30) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `norek` varchar(30) DEFAULT NULL,
  `nama_kecamatan` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `refreshToken` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `flag` varchar(2) DEFAULT NULL,
  `wrong_pass` int(2) DEFAULT NULL,
  `kode_kantor` varchar(5) DEFAULT NULL,
  `kode_kantor_kas` varchar(5) DEFAULT NULL,
  `is_login` varchar(5) DEFAULT NULL,
  `is_tnt` varchar(30) DEFAULT NULL,
  `menu` varchar(50) DEFAULT NULL,
  `type_user` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'cbe80090-4431-4ae4-b4b3-b94a93360ba5', '100', 'admin', 'admin', 'Boyolali', null, null, 'admin@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$zUjRHOemFIZK3XndA/geUw$m7MImcKlmt8nYT1jdGCxiFakW04IxI9J+y0OTnEmQnY', 'admin', null, '2023-04-14 08:52:35', '2023-11-17 08:56:36', '0', '0', '01', '01', '0', null, '1,2,3,4,5', 'int');

-- ----------------------------
-- Table structure for `users_ext`
-- ----------------------------
DROP TABLE IF EXISTS `users_ext`;
CREATE TABLE `users_ext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `norek` varchar(20) DEFAULT NULL,
  `kode_instansi` varchar(20) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `nama_user_cbs` varchar(50) DEFAULT NULL,
  `nama_kecamatan` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `refreshToken` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `flag` varchar(2) DEFAULT NULL,
  `wrong_pass` int(2) DEFAULT NULL,
  `kode_kantor` varchar(5) DEFAULT NULL,
  `kode_kantor_kas` varchar(5) DEFAULT NULL,
  `is_login` varchar(5) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `menu` varchar(50) DEFAULT NULL,
  `type_user` varchar(10) DEFAULT NULL,
  `is_tnt` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_ext
-- ----------------------------

-- ----------------------------
-- Procedure structure for `updateStatusTrans`
-- ----------------------------
DROP PROCEDURE IF EXISTS `updateStatusTrans`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateStatusTrans`(cPenId CHAR(25))
BEGIN
    DECLARE jmltransfer DOUBLE;
    DECLARE jmlpajak DOUBLE;
    DECLARE jmlbpjs DOUBLE;
    DECLARE jmlinternal DOUBLE;
    DECLARE jmlexternal DOUBLE;

    DECLARE statustransfer DOUBLE;
    DECLARE statuspajak DOUBLE;
    DECLARE statusbpjs DOUBLE;
    DECLARE statusinternal DOUBLE;
    DECLARE statusexternal DOUBLE;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '0'
into jmlinternal;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '0' and status_trans ='1'
into statusinternal;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '1'
into jmltransfer;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '1' and status_trans ='1'
into statustransfer;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '2'
into jmlpajak;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '2' and status_trans ='1'
into statuspajak;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '3'
into jmlbpjs;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi = '3' and status_trans ='1'
into statusbpjs;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi in ('1','2','3')
into jmlexternal;

select COUNT(pencairan_id) 
FROM tb_pencairan_desa_trans 
where pencairan_id=cPenId and jenis_transaksi in ('1','2','3') and status_trans ='1'
into statusexternal;
 


    UPDATE tb_pencairan_desa
    SET
        status_internal = 
            CASE
                WHEN jmlinternal > 0 THEN CONCAT('Internal : Jumlah ', jmlinternal, ', Berhasil ', statusinternal)
                ELSE NULL
            END,
        status_transfer =
            CASE
                WHEN jmltransfer > 0 THEN CONCAT('Transfer : Jumlah ', jmltransfer, ', Berhasil ', statustransfer)
                ELSE NULL
            END,
        status_pajak =
            CASE
                WHEN jmlpajak > 0 THEN CONCAT('Pajak : Jumlah ', jmlpajak, ', Berhasil ', statuspajak)
                ELSE NULL
            END,
        status_bpjs =
            CASE
                WHEN jmlbpjs > 0 THEN CONCAT('BPJS : Jumlah ', jmlbpjs, ', Berhasil ', statusbpjs)
                ELSE NULL
            END,
        status_trans_internal = 
            CASE
                WHEN jmlinternal > 0 AND jmlinternal = statusinternal THEN '1'
                ELSE '0'
            END,
        status_trans_external = 
            CASE
                WHEN jmlexternal > 0 AND jmlexternal = statusexternal THEN '1'
                ELSE '0'
            END,
					status_pencairan_desa =
						CASE
								WHEN jmlinternal > 0 AND jmlexternal > 0 AND status_trans_internal = '1' AND status_trans_external = '1' THEN '1'
								WHEN jmlinternal > 0 AND jmlexternal = 0 AND status_trans_internal = '1' THEN '1'
								WHEN jmlexternal > 0 AND jmlinternal = 0 AND status_trans_external = '1' THEN '1'
						ELSE '0'
    END




    WHERE pencairan_id = cPenId;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GetIdOto`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetIdOto`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetIdOto`(cIdUser CHAR(10), cTanggal DATE) RETURNS varchar(20) CHARSET latin1
BEGIN
     declare nIdOto varchar(20);

		SELECT IF((select count(id_otorisasi) FROM log_otorisasi WHERE left(id_otorisasi,3)= 'OT.' and tgl_trans = cTanggal and user_ibs = cIdUser
           ORDER BY id_otorisasi)<1,concat('OT.','001', '.', REPLACE(cTanggal,'-',''),'.',cIdUser ),
           (SELECT concat('OT.', LPAD((substr(max(id_otorisasi),4,3)+1),3,'0'), '.', REPLACE(cTanggal,'-',''),'.', cIdUser)
           FROM log_otorisasi WHERE left(id_otorisasi,3)= 'OT.' and tgl_trans = cTanggal and user_ibs = cIdUser
           ORDER BY id_otorisasi)
           ) INTO nIdOto;


    return nIdOto;

END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `update_status_trans_induk_afterupdate`;
DELIMITER ;;
CREATE TRIGGER `update_status_trans_induk_afterupdate` AFTER UPDATE ON `tb_pencairan_desa_trans` FOR EACH ROW BEGIN
     declare cPenId char(40);
     set cPenId =new.pencairan_id;
     call updateStatusTrans(cPenId);
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `update_stts_nct_b4_insert`;
DELIMITER ;;
CREATE TRIGGER `update_stts_nct_b4_insert` BEFORE INSERT ON `tb_tnt` FOR EACH ROW BEGIN
IF (NEW.processed_at IS NULL  or  NEW.processed_at = '' or  NEW.processed_at = '0000-00-00 00:00:00' ) and (NEW.finished_at IS NULL  or  NEW.finished_at = '' or  NEW.finished_at = '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Pending';

ELSEIF (NEW.processed_at IS NOT NULL  or  NEW.processed_at <>'' or NEW.processed_at <>'0000-00-00 00:00:00') and  (NEW.finished_at IS NULL  or  NEW.finished_at = ''  or  NEW.finished_at = '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Proses';

ELSEIF (NEW.processed_at IS NULL  or  NEW.processed_at ='' or NEW.processed_at ='0000-00-00 00:00:00') and  (NEW.finished_at IS NOT NULL  or  NEW.finished_at <> '' or  NEW.finished_at <> '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Proses';

ELSEIF (NEW.processed_at IS NOT NULL  or  NEW.processed_at <>''  or  NEW.processed_at <>'0000-00-00 00:00:00') and  (NEW.finished_at IS NOT NULL  or  NEW.finished_at <> '' or NEW.finished_at <> '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Finish';

END IF;

END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `update_stts_nct_b4_update`;
DELIMITER ;;
CREATE TRIGGER `update_stts_nct_b4_update` BEFORE UPDATE ON `tb_tnt` FOR EACH ROW BEGIN
IF (NEW.processed_at IS NULL  or  NEW.processed_at = '' or  NEW.processed_at = '0000-00-00 00:00:00' ) and (NEW.finished_at IS NULL  or  NEW.finished_at = '' or  NEW.finished_at = '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Pending';

ELSEIF (NEW.processed_at IS NOT NULL  or  NEW.processed_at <>'' or NEW.processed_at <>'0000-00-00 00:00:00') and  (NEW.finished_at IS NULL  or  NEW.finished_at = ''  or  NEW.finished_at = '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Proses';

ELSEIF (NEW.processed_at IS NULL  or  NEW.processed_at ='' or NEW.processed_at ='0000-00-00 00:00:00') and  (NEW.finished_at IS NOT NULL  or  NEW.finished_at <> '' or  NEW.finished_at <> '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Proses';

ELSEIF (NEW.processed_at IS NOT NULL  or  NEW.processed_at <>''  or  NEW.processed_at <>'0000-00-00 00:00:00') and  (NEW.finished_at IS NOT NULL  or  NEW.finished_at <> '' or NEW.finished_at <> '0000-00-00 00:00:00')
THEN
SET NEW.status = 'Finish';

END IF;


END
;;
DELIMITER ;
